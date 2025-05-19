declare namespace RAPI {
  type LoginParams = {
    userName: string;
    password: string;
  };

  type ApiResult = {
    data: any;
    success: boolean;
    message: string;
    code: string;
  };
}