declare global {
  namespace NodeJs {
    interface ProcessEnv {
      ENV: 'production' | 'development'
      // [key: string]: string | undefined
    }
  }
}
declare module '*.jpeg' {
  const value: any
  export = value
}

export {}
