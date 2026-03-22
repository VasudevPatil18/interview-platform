import axiosInstance from "./axios";

export async function executeCode(language, code) {
  try {
    const { data } = await axiosInstance.post("/code/run", { code, language });
    return data;
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.error || "Failed to execute code",
    };
  }
}
