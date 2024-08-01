let session: string | null = null;

export const getSession = () => session;

export const setSession = (value: string) => {
  console.log('session token has been set');
  session = value;
};
