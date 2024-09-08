import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

// export async function loginGoogle() {
//   const { data, error } = supabase.auth.signInWithOAuth({
//     provider: 'google',
//     // options: {
//     //   redirectTo: `${window.location.origin}/auth/callback`, // Asegúrate de que esta URL esté configurada en Google Cloud Console
//     // },
//   })

//   if (error) throw new Error(error.message);

//   return data
// }

// export async function loginGoogle() {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//       redirectTo: `${process.env.VITE_PUBLIC_BASE_URL}/auth/callback`,
//     } })
//   if (error) console.error('Error: ', error.message)

//   console.log(data)
// }

export async function signup({ fullname, email, password, profile_pic }) {
  const fileName = `dp-${fullname.split(" ").join("-")}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullname,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });

  if (error) {
    console.error("Error from Supabase:", error);  // Añadir este console.log para verificar
    throw new Error(error.message);  // Esto asegurará que el error se propague
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if(error) throw new Error(error.message)
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();

  if (!session.session) return null;
  if (error) throw new Error(error.message);

  return session.session?.user;
}
