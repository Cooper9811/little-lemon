// 模拟后端 API 请求
export const submitAPI = (formData) => {
  // 边缘情况1：缺少必填字段
  if (!formData.date || !formData.time || !formData.guests) {
    console.error("API Error: Missing required fields.");
    return false;
  }
  
  // 边缘情况2：客人数量超出限制
  if (formData.guests < 1 || formData.guests > 10) {
    console.error("API Error: Guest count out of bounds.");
    return false;
  }

  // 模拟 90% 成功率
  const isSuccess = Math.random() < 0.9;
  if (!isSuccess) {
    console.error("API Error: Network failure simulated.");
  }
  return isSuccess;
};