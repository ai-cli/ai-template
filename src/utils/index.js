/**
 * 从缓存里获取数据
 * @param key
 * @return value
 */
export function getStorageSync (key) {
    return wx.getStorageSync(key)
}

/**
 * 将数据保存到缓存
 * @param key
 * @param value
 */
export function setStorageSync (key, value) {
    wx.setStorageSync(key, value)
}

/**
 * 显示加载中
 * @param data
 */
export function showLoading (data) {
    uni.showLoading(data)
}
  
  /**
   * 隐藏加载中
   */
export function hideLoading () {
    uni.hideLoading()
}

export function formatTime(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
  
    const t1 = [year, month, day].map(formatNumber).join("/");
    const t2 = [hour, minute, second].map(formatNumber).join(":");
  
    return `${t1} ${t2}`;
  }
  
  
  export function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    const t1 = [year, month, day].map(formatNumber).join("-");
  
    return `${t1}`;
  }

export default {
    getStorageSync,
    setStorageSync,
    showLoading,
    hideLoading,
    formatTime,
    formatDate
  }