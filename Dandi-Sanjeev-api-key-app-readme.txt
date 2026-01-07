linkedin post
Different types of prompt engineeting techniques
COntext engineering
Prompt vs contect engineering
Cursor rules types
ML vs AI vs GenAI
The dummy mode ; leveraging copilot, llm to leverage while writing code
 

--AC SETUP with Credit Card
Google Studio
OpenAI

OAuth (Google SSO)
Client ID : [REMOVED - See .env.local]
Client Secret : [REMOVED - See .env.local]

Your API Endpoints:
Method	Endpoint	Purpose
GET	/api/keys	List all API keys
POST	/api/keys	Create new API key
PUT	/api/keys/[id]	Update an API key
DELETE	/api/keys/[id]	Delete an API key
POST	/api/validate	Validate an API key
POST	/api/github-summarizer	Summarize GitHub repo
 
 
https://sanjeev-api-key-app.vercel.app/api/keys
https://sanjeev-api-key-app.vercel.app/api/keys/{id}
https://sanjeev-api-key-app.vercel.app/api/validate
https://sanjeev-api-key-app.vercel.app/api/github-summarizer

https://sanjeev-api-key-app.vercel.app/dashboards

 
moved from npm to yarn

Cursor : Start Server - yarn dev


Local Deployment : http://localhost:3000/dashboards
(vercel) Cloud deployment : https://sanjeev-api-key-app.vercel.app/
							


CURL API checks for API verification
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 curl.exe -X POST http://localhost:3000/api/validate -H "Content-Type: application/json" -d "{\"key\": \"dandi-yh1YtDZboF8U2gqaHtZP8uiL\"}"
 curl.exe -X POST http://localhost:3000/api/validate -H "Content-Type: application/json" -d '{"key": "dandi-Aw9DcrFS49Afa8Pv055II4VQ"}'
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
Sanjeev API KEY APP on GITHUB
babbarsanjeev  user

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 Github repository :   https://github.com/babbarsanjeev/sanjeev-api-key-app
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Vercel 
https://sanjeev-api-key-app.vercel.app/


Supabase : postgres DB

Researcher : Used https://github.com/assafelovic/gpt-researcher  -- Multi agent search engine
https://github.com/langchain-ai/langchain

Thunder Client - for rest API testing in Cursor
Hoppscoth for API testing

POST : https://sanjeev-api-key-app.vercel.app/api/validate
key : <take from supabase>

POST : http://localhost:3000/api/github-summarizer

Vercel : https://sanjeev-api-key-app.vercel.app/api/github-summarizer
{"repo_url": "https://github.com/assafelovic/gpt-researcher"}
OR
{"repo_url": "https://github.com/langchain-ai/langchain"}




cd "/c/Users/babbars/Desktop/Cursor AI Tutorial/cursor-course/dandi"
git init
git add .
git commit -m "Initial commit - Sanjeev API Key App"
git remote add origin https://github.com/babbarsanjeev/sanjeev-api-key-app.git
git branch -M main
git push -u origin main