/// <reference types="vite/client" />


// VAI ADICIONANDO O READONLY DE CADA chave que vc adicionar no .env
interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_SOME_OTHER_KEY: string
  readonly VITE_API_BACKEND: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}