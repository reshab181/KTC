export async function tokenFromMMI() {
    const urlencoded = new URLSearchParams();
  
    const requestOptions = {
      method: 'POST',
      body: urlencoded,
      redirect: 'follow',
    };
  
    try {
      const response = await fetch(
        "https://outpost.mapmyindia.com/api/security/oauth/token?grant_type=client_credentials&client_id=33OkryzDZsIk6jfukki-FfOGzG6jGTz_X-NBQnWydvjbP03ss7EjTOcBXKwiRpM5GJlnuBJESQ37rGeGouOH0Q==&client_secret=lrFxI-iSEg9eBbkGuWL0S-z4QTwM_t31-Fla-GsyLUNUdLw-VluK9Uq3GDgMsq6L0sh4tcAPNKN-FkKeuC7tKljvi7cElTNw",
        requestOptions
      );
  
      const result = await response.text();
      const parsedResult = JSON.parse(result);
  
      return parsedResult;
    } catch (error) {
      console.error('Error fetching MMI token:', error);
      throw error;
    }
  }
  