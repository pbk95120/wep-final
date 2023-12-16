#Import Fastapi
#for making server
from fastapi import FastAPI, Form, Request, UploadFile, File
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
import openai
import shutil
import os

#This is the key for Using OpenAi
#Please do not share this key
OPEN_API_KEY = "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" #You can use your own key

#Define FastAPI Application
app = FastAPI()

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
def return_signup_stat(userid:str = Form(...), password:str = Form(...)):
    #Get All User Directories in server
    for path, dir, files in os.walk("./data/"):
        print(dir)
        for folder_name in dir:
            #When there exists user's folder
            if folder_name == userid:
                return {"exist":True, "status":False}
    try:
        user_dir = "./data/" + userid
        os.mkdir(user_dir)
        f = open(user_dir + "/." + userid,"w+")
        f.write(password)
        f.close()
        return {"exist":False, "status":True}
    except:
        return {"exist":False, "status":False}       

#Function For Sign In
@app.post('/signin')
def return_signin_stat(userid:str = Form(...), password:str = Form(...)):
    #Get All User Directories in server
    for path, dir, files in os.walk("./data/"):
        print(dir)
        for folder_name in dir:
            #When there exists user's folder
            if folder_name == userid:
                #there has a hidden file for looking up password
                f = open("./data/" + userid + "/." + userid,"r")
                password_validate = f.read()
                #When the password matches
                if password == password_validate:
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
def upload_file(userid:str = Form(...), password:str = Form(...), filename:str = Form(...), contents:str = Form(...)):
    upload_dir = "./data/" + userid + "/"
    f = open(upload_dir  + filename,"w+")
    f.write(contents)
    f.close()

    docs = load_n_split(upload_dir + filename)
    save_as_db(upload_dir, filename, docs)

    return {"status": True, "file": filename}

@app.post("/uploadSpeech/{userid}/{filename}")
def upload_speech(userid:str, filename:str, file: UploadFile):
    upload_dir = "./data/" + userid + "/"
    
    with open(os.path.join(upload_dir, filename + ".mp3"), "wb") as fp:
        shutil.copyfileobj(file.file, fp)

    content = open(os.path.join(upload_dir, filename + ".mp3"), "rb")
    openai.api_key = OPEN_API_KEY
    transcript = openai.Audio.transcribe("whisper-1", content)
    f = open(upload_dir  + filename + ".txt","w+")
    f.write(transcript.text)
    f.close()

    return {"status": True, "filename": filename}

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
