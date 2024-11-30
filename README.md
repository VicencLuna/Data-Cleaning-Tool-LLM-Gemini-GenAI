# Data-Cleaning-Tool-LLM-Gemini-GenAI
GitHub - Gemini LLM GenAI - Data Cleaning Tools
Description:
This project provides Google Apps Script functions to interact with the Gemini large language model (LLM) from Google AI, allowing you to correct a list of sentences in order to clean your existing data.

Features:
  Provide a list of products with spelling errors and random formatting, and return a JSON with the entire list corrected.
  The correction is done using the Gemini LLM and a specified prompt to return a JSON with the entire list corrected.
  
Offers customization options for:
  Input prompt
  Language (specified in the prompt itself)
  Temperature (controls randomness)
  Top K (influences diversity)
  Top P (guides next word selection)
  Maximum Output Tokens (limits length)
  
JSON Data Parsing and Display:
  Employs the display_JSON_Sheet_Input function to read JSON data entered into the spreadsheet and present it in a clear table format.

Requirements:
  Google Apps Script project
  Google Sheets document (where the script will run)
  A valid Google Cloud Project with the Google AI Platform APIs enabled (specifically, the Generative Language API)
  An API key for the Generative Language API (store it as a script property named GOOGLE_API_KEY)
  visit: https://aistudio.google.com/app/apikey?hl=es-419&_gl=1*1keffui*_ga*NjAxNTI0NTQ3LjE3MzIxMTQ2MjE.*_ga_P1DBVKWT6V*MTczMjczNzY4Ny42LjAuMTczMjczNzY4Ny4wLjAuMTE0NDQyNDE3Mw..

Installation:
  Create a new Google Apps Script project.
  Copy and paste the code provided in this repository into your script editor.
  Navigate to Resources > Advanced Google services (in the Script Editor menu).
  Enable the Generative Language API service.
  Go to Resources > Script properties (in the Script Editor menu).
  Click Create property and name it GOOGLE_API_KEY.
  Paste your Generative Language API key into the value field.
  Save the script.

Usage:
Open the Google Sheets document where you want to use the script.
In the Script Editor, from the Run menu, select the function you want to use:
correctData_Gemini_JSON: To correct grammar and generate text.
display_JSON_Sheet_Input: To parse and display JSON data.

![GitHub-GeminiLLMGenAI-DataCleaningTools-FullsdeclculdeGoogle-GoogleChrome2024-11-3017-47-58-ezgif com-speed](https://github.com/user-attachments/assets/3355d152-3f30-46b4-af59-0bb5e669273f)

