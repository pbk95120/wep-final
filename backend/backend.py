from fastapi import FastAPI, Form, Request, UploadFile, File
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from langchain.indexes import VectorstoreIndexCreator
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI


import uvicorn
from glob import glob
import os
import shutil


from pydantic import BaseModel

OPEN_API_KEY = "yourkey"

class requestData(BaseModel):
    userId: str
    password: Optional[str] = None
    fileName: Optional[str] = None
    contents: Optional[str] = None

origins = [
    "*",
]

app = FastAPI()
templates = Jinja2Templates(directory='./')

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_n_split(path):
    loader = TextLoader(path)
    document = loader.load()

    text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(chunk_size=1000, chunk_overlap=0)
    docs = text_splitter.split_documents(document)
    print("This Script has " + str(len(docs)) + " docs.")

    return docs

def save_as_db(dbPath, dbName, docs):
    path = dbPath + "." + dbName
    index = VectorstoreIndexCreator(
        vectorstore_cls=FAISS,
        embedding=OpenAIEmbeddings(openai_api_key=OPEN_API_KEY),
        ).from_documents(docs)
    index.vectorstore.save_local(path)

def load_from_db(path):
    fdb = FAISS.load_local(path, OpenAIEmbeddings(openai_api_key=OPEN_API_KEY))
    retriever = fdb.as_retriever(search_type='similarity', search_kwargs={"k":2})

    return retriever

@app.post('/signup')
def return_signup_stat(request: requestData):
    for path, dir, files in os.walk("./data/"):
        print(dir)
        for folder_name in dir:
            if folder_name == request.userId:
                return {"exist":True, "status":False}
    
    try:
        user_dir = "./data/" + request.userId
        os.mkdir(user_dir)
        f = open(user_dir + "/." + request.userId,"w+")
        f.write(request.password)
        f.close()
        return {"exist":False, "status":True}
    except:
        return {"exist":False, "status":False}       

@app.post('/signin')
def return_signin_stat(request: requestData):
    for path, dir, files in os.walk("./data/"):
        print(dir)
        for folder_name in dir:
            if folder_name == request.userId:
                f = open("./data/" + request.userId + "/." + request.userId,"r")
                password = f.read()
                if password == request.password:
                    return {"exist":True, "status":True}
                else:
                    return {"exist":True, "status":False}

    return {"exist":False, "status":False}

@app.get('/getNoteList/{userid}')
def return_note_list(userid:str):
    file_list = os.listdir("./data/" + userid)
    # file_list_txt = [file for file in file_list if file.endswith(".txt")]
    file_list_txt = [file for file in file_list if not file.startswith(".")]

    file_list_txt.sort()

    return {"fileList": file_list_txt}

@app.get('/getNote/{userid}/{filename}')
def return_note_list(userid:str, filename:str):
    f = open("./data/" + userid + "/" + filename,"r")
    contents = f.read()

    return {"contents": contents}

@app.post("/uploadText")
async def upload_file(request: requestData):
    upload_dir = "./data/" + request.userId + "/"
    f = open(upload_dir  + request.fileName,"w+")
    f.write(request.contents)
    f.close()

    docs = load_n_split(upload_dir + request.fileName)
    save_as_db(upload_dir, request.fileName, docs)

    return {"status": True, "file": request.fileName}

@app.get('/getQa/{userid}/{filename}/{query}')
def return_query(userid:str, filename:str, query:str):
    path = "./data/" + userid + "/." + filename
    
    chat = ChatOpenAI(model_name='gpt-3.5-turbo', temperature=0.9, openai_api_key=OPEN_API_KEY)
    # chat = ChatOpenAI(model_name='gpt-4', temperature=0.9, openai_api_key=OPEN_API_KEY)

    retriever = load_from_db(path)
    qa = RetrievalQA.from_chain_type(llm=chat,
                                    chain_type="stuff", retriever=retriever)
    result = qa.run(query)
    return {"status": True, "query": result}

if __name__=='__main__':
    uvicorn.run(app, host='localhost', port = 8080)
