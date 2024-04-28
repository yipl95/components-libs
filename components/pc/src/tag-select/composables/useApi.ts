import { BASE_URL, $apiCustomerBaseUrl, createAxios } from './useAxios';

const useApi = () => {
  const ajax: any = (window as any).$ajax ? (window as any).$ajax : createAxios();
  const baseUrl: string = BASE_URL;

  // 标签组列表
  const tagGroupList = async (params = {}) => {
    const { code, success, data }: any = await ajax({
      method: 'POST',
      url: `${baseUrl}${$apiCustomerBaseUrl}/tag/group/page`,
      data: {
        pageSize: 1000,
        ...params
      }
    })
    if (success && code === '500200') {
      return data && data.records ? data.records.map((item: any) => ({
        ...item,
        fold: true,
        checkAll: false,
        loading: false,
        list: [],
        value: item.id
      })) : []
    }
  
    return []
  }
  
  // 企业标签列表
  const tagList = async (tagCategoryId: number, tagGroupId: number) => {
    if (!tagCategoryId || !tagGroupId) return []
  
    const { code, success, data }: any = await ajax({
      method: 'POST',
      url: `${baseUrl}${$apiCustomerBaseUrl}/tag/page`,
      data: {
        pageIndex: 1,
        pageSize: 1000,
        tagCategoryId,
        tagGroupId
      }
    })
    if (success && code === '500200') {
      return data && data.records ? data.records.map((item: any) => {
        return {
          ...item,
          active: false
        }
      }) : []
    }
  
    return []
  }

  return {
    tagGroupList,
    tagList
  }
}

export default useApi
