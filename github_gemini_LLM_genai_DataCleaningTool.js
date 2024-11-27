const scriptProperties = PropertiesService.getScriptProperties();
const apiKey = scriptProperties.getProperty('GOOGLE_API_KEY');
const url_flash='https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + apiKey;


function myFunction() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const apiKey = scriptProperties.getProperty('GOOGLE_API_KEY');

  console.log(apiKey); // Esto imprimirá '1233' en el registro de ejecución
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.

  ui.createMenu('GitHub - LLM - Gemini')
      .addItem('correct List with LLM-Gemini', 'correctData_Gemini_JSON')
      .addSeparator()
      .addItem('display JSON', 'display_JSON_Sheet_Input')
      .addToUi();
  
}

function correctData_Gemini_JSON(input_prompt,input_idioma,input_temperatura='0.1', input_topP=0.95, input_topK=30, input_maxOutputTokens=2000) {

  var prompt_setup=createArrayprompt_input(input_prompt,input_idioma)
  Logger.log(prompt_setup)

  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({
      "model": "models/text-embedding-004",
      "contents": [
        {
          "parts": prompt_setup,
          "role":"user"
        }
      ],
      "safetySettings": [
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_ONLY_HIGH"
            }
        ],
        "generationConfig": {
            "stopSequences": [
                "Title"
            ],
            "response_mime_type": "application/json",
            "temperature": input_temperatura,
            "top_k":input_topK,
            "top_p":input_topP,
            "candidate_count": 1,
            "maxOutputTokens": input_maxOutputTokens,
        }
    })
  };
  Logger.log(options)

 // Send the request and get the response
  const response = UrlFetchApp.fetch(url_flash, options);
  const responseText = response.getContentText();
  const jsonResponse = JSON.parse(responseText);

  Logger.log(jsonResponse);
 
// Extract the response from Gemini
// (The structure of the response may vary, 
// adjust this according to the actual API response)
  var generatedContent = jsonResponse.candidates[0].content.parts[0].text;

  return generatedContent 
}

function createArrayprompt_input(rango, input_idioma) {
  Logger.log(rango);

  var prompt_setup=""
// Create the resulting array
  var result = rango.slice(0).map(function(fila){
    input_prompt=fila[0] // Toma el primer (y único) valor de cada fila
    prompt_setup=" Correct the grammar in the language " + input_idioma + " of the sentence: " + input_prompt + 
                       " and return a JSON with the following schema: values:[\"correction\": \"model correction\"]"
    return {
      "text": prompt_setup
    };
  });
  
  return result
}

function display_JSON_Sheet_Input() {

 // Define the starting row and column where the data will be written
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const rangeActive = sheet.getActiveRange();
  const startRow = rangeActive.getRow();
  const startCol = rangeActive.getColumn();
  
  
  const input_json=sheet.getRange(startRow, startCol).getValue();
  const data = JSON.parse(input_json);
  const valores = data.values;
  
 // Get all unique headers
  const headers = [...new Set(valores.flatMap(obj => Object.keys(obj)))];
  
// Write the headers
  sheet.getRange(startRow+1, startCol, 1, headers.length).setValues([headers]);
  
  // Prepare the data for writing
  const rows = valores.map(obj => 
    headers.map(header => obj[header] !== undefined ? obj[header] : '')
  );
  
// Write the data
  sheet.getRange(startRow + 2, startCol, rows.length, headers.length).setValues(rows);
}