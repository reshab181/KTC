class KTCSingleton {
    private static instance: KTCSingleton;
    private jwtToken: String = '';
    private oauthToken: string|undefined = undefined
  
    private constructor() {
    //   console.log("Singleton Instance Created");
    }
  
    public static getInstance(): KTCSingleton {
      if (!KTCSingleton.instance) {
        KTCSingleton.instance = new KTCSingleton();
      }
      return KTCSingleton.instance;
    }

    public getJWTToken() {
        return this.jwtToken;
    }

    public setJWTToken(token: string) {
        this.jwtToken = token;
    }

    public getOAuthToken() {
        return this.oauthToken;
    }

    public setOAuthToken(token: string) {
        this.oauthToken = token;
    }
  
}

export default KTCSingleton;