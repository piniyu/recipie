declare global {
  namespace NodeJs {
    interface ProcessEnv {
      ENV: 'production' | 'development'
    }
  }
}

export {}
