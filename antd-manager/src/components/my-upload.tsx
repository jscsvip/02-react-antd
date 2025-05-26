import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { dalImg } from '@/utils/tools';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
// 上传之前的校验
// const beforeUpload = (file: FileType) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// };
type Props = {
    imageUrl: string;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}
const MyUpload = ({imageUrl, setImageUrl}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
        console.log(info.file.response); // 服务器返回的图片地址
        setImageUrl(info.file.response.data);
      // Get this url from response in real world. 上传成功将图片转换base64
    //   getBase64(info.file.originFileObj as FileType, (url) => {
    //     setLoading(false);
    //     setImageUrl(url);
    //   });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={
            // @ts-ignore
            SERVER_URL + '/api/v1/common/upload'
        }
        // beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={dalImg(imageUrl)} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
  );
};

export default MyUpload;