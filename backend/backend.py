#Import Fastapi
#for making server
from fastapi import FastAPI, Form, Request, UploadFile, File
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

#Import Langchain
#for executing queries
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.indexes import VectorstoreIndexCreator
from langchain.document_loaders import TextLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from typing import Optional

#Import Etc..
from pydantic import BaseModel
from glob import glob
import uvicorn
import os

#This is the key for Using OpenAi
#Please do not share this key
OPEN_API_KEY = "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" #You can use your own key

#The Class for Request
#for defining requesting structure during 'POST'
class requestData(BaseModel):
    userId: str #get User Id as a String, and it must be included in the request
    password: Optional[str] = None  #get Password as a String, and it is optional
    fileName: Optional[str] = None  #get File Name as a String, and it is optional
    contents: Optional[str] = None  #get Contents as a String, and it is optional

#Define FastAPI Application
app = FastAPI()
templates = Jinja2Templates(directory='./')

#Set All IPs to access backend server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Split the text to document loader attributes
def load_n_split(path):
    loader = TextLoader(path)
    document = loader.load()

    text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(chunk_size=1000, chunk_overlap=0)
    docs = text_splitter.split_documents(document)
    print("This Script has " + str(len(docs)) + " docs.")

    return docs

#Save Langchain to DB
def save_as_db(dbPath, dbName, docs):
    path = dbPath + "." + dbName
    index = VectorstoreIndexCreator(
        vectorstore_cls=FAISS,
        embedding=OpenAIEmbeddings(openai_api_key=OPEN_API_KEY),
        ).from_documents(docs)
    index.vectorstore.save_local(path)

#Load Langchain to retriver
def load_from_db(path):
    fdb = FAISS.load_local(path, OpenAIEmbeddings(openai_api_key=OPEN_API_KEY))
    retriever = fdb.as_retriever(search_type='similarity', search_kwargs={"k":2})

    return retriever

#Function For Sign Up
@app.post('/signup')
def return_signup_stat(request: requestData):
    #Get All User Directories in server
    for path, dir, files in os.walk("./data/"):
        print(dir)
        for folder_name in dir:
            #When there exists user's folder
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

#Function For Sign In
@app.post('/signin')
def return_signin_stat(request: requestData):
    #Get All User Directories in server
    for path, dir, files in os.walk("./data/"):
        print(dir)
        for folder_name in dir:
            #When there exists user's folder
            if folder_name == request.userId:
                #there has a hidden file for looking up password
                f = open("./data/" + request.userId + "/." + request.userId,"r")
                password = f.read()
                #When the password matches
                if password == request.password:
                    return {"exist":True, "status":True}
                #When the password not matches
                else:
                    return {"exist":True, "status":False}

    return {"exist":False, "status":False}

#Function For Listing up Notes
@app.get('/getNoteList/{userid}')
def return_note_list(userid:str):
    file_list = os.listdir("./data/" + userid)
    file_list_txt = [file for file in file_list if not file.startswith(".")]

    file_list_txt.sort()

    return {"fileList": file_list_txt}

#Function For Getting Contents of Notes
@app.get('/getNote/{userid}/{filename}')
def return_note(userid:str, filename:str):
    f = open("./data/" + userid + "/" + filename,"r")
    contents = f.read()

    return {"contents": contents}

#Function For Uploading Notes
@app.post("/uploadNote")
async def upload_file(request: requestData):
    upload_dir = "./data/" + request.userId + "/"
    f = open(upload_dir  + request.fileName,"w+")
    f.write(request.contents)
    f.close()

    docs = load_n_split(upload_dir + request.fileName)
    save_as_db(upload_dir, request.fileName, docs)

    return {"status": True, "file": request.fileName}

#Function For Getting Query Answer
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
