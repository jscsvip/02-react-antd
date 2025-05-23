import { request } from '@umijs/max';
/**
 * 查询列表
 * @param params 
 * @returns 
 */
export const loadDataAPI = async (
    // 第一个参数 params 查询表单和 params 参数的结合
    // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
    params: any & {
      pageSize: number;
      current: number;
    },
    // sort,
    // filter,
  ) => {
    const res = await request('/api/v1/admin/article_categories', {
      method: 'GET',
      params: {
        page:params.current,
        pageSize:params.pageSize,
        ...params,
      },
    });
    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
    // 如果需要转化参数可以在这里进行修改
    // const msg = await myQuery({
    //   page: params.current,
    //   pageSize: params.pageSize,
    // });
    // console.log(res);
    return {
      ...res.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
    //   total: 21,
    };
  }
/*
* 新增
* @param data
* @returns
*/
  export const addModelAPI = async (
    data: any,
  ) => {
    const res = await request('/api/v1/admin/article_categories', {
      method: 'POST',
      data: {
        ...data,
      },
    });
    return res;
  }
/**
 * 修改
 * @param id 
 * @param data 
 * @returns 
 */
  export const editModelAPI = async (
    id:string,
    data: any,
  ) => {
    const res = await request(`/api/v1/admin/article_categories/${id}`, {
      method: 'PUT',
      data: {
       ...data,
      },
    });
    return res;
  }

  /***
   * 根据id获取单条记录
   * @param id
   * @returns
   */
export const loadDataByIdAPI = async (
  id: string,
) => {
  const res = await request(`/api/v1/admin/article_categories/${id}`, {
    method: 'GET',
  });
  return res;
}
/**
 * 根据id删除一个
 * @param id 
 * @returns 
 */
export const delByIdAPI = async (
  id: string,
) => {
  const res = await request(`/api/v1/admin/article_categories/${id}`, {
    method: 'DELETE',
  });
  return res;
}
/**
 * 批量删除,多个id用逗号隔开
 * @param ids 
 * @returns 
 */
export const delManyByIdsAPI = async (
  ids: string,
) => {
  const res = await request(`/api/v1/admin/article_categories/delete_many?id=${ids}`, {
    method: 'DELETE',
  });
  return res;
}