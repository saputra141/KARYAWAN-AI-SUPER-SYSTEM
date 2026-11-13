
const SUPABASE_URL = "https://abdjvqrzqvkbnbuoczmh.supabase.co";
const SUPABASE_KEY = "TEMPEL_PUBLISHABLE_KEY_KAMU";

const db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

window.db = db;

// REGISTER
window.registerUser = async (name, email, password) => {
  const { data, error } = await db.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name }
    }
  });

  if (error) throw error;
  return data;
};

// LOGIN
window.loginUser = async (email, password) => {
  const { data, error } = await db.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
};

// LOGOUT
window.logoutUser = async () => {
  const { error } = await db.auth.signOut();
  if (error) throw error;
};

// USER
window.getCurrentUser = async () => {
  const { data, error } = await db.auth.getUser();
  if (error) throw error;
  return data.user;
};

// PROFILE
window.getProfile = async () => {
  const user = await window.getCurrentUser();
  if (!user) return null;

  const { data, error } = await db
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

// CEK PRO
window.checkPro = async () => {
  const { data, error } = await db.rpc("is_pro");
  if (error) throw error;
  return data === true;
};

// PEMBAYARAN PRO
window.createProPayment = async () => {
  const user = await window.getCurrentUser();

  if (!user) {
    throw new Error("Silakan login terlebih dahulu.");
  }

  const { data, error } = await db
    .from("payments")
    .insert({
      user_id: user.id,
      amount: 19000,
      duration_days: 7,
      payment_method: "whatsapp",
      status: "pending"
    })
    .select()
    .single();

  if (error) throw error;

  const message = encodeURIComponent(
    `Halo Admin, saya ingin membeli PRO KARYAWAN AI SUPER SYSTEM Rp19.000/7 hari. ID pembayaran: ${data.id}`
  );

  window.open(
    `https://wa.me/6285176769024?text=${message}`,
    "_blank"
  );

  return data;
};

// AKTIVASI PRO ADMIN
window.activatePro = async (paymentId) => {
  const { data, error } = await db.rpc(
    "admin_activate_pro",
    { payment_id: paymentId }
  );

  if (error) throw error;
  return data;
};

// AI GEMINI VIA SUPABASE EDGE FUNCTION
window.askKaryawanAI = async (type, prompt) => {
  const { data, error } = await db.functions.invoke(
    "karyawan-ai",
    {
      body: {
        type,
        prompt
      }
    }
  );

  if (error) throw error;
  if (!data || !data.success) {
    throw new Error(data?.error || "AI gagal memberikan jawaban.");
  }

  return data.result;
};
