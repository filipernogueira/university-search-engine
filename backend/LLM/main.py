from llama_index.llms.ollama import Ollama

llm = Ollama(model="gemma", request_timeout=30.0)

result = llm.complete("Hello World")
print(result)