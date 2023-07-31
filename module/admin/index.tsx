import React, { useState } from 'react'
import classNames from 'classnames/bind'
import style from "./Admin.module.scss"
import Head from 'next/head'
import PageTitle from '../../components/PageTitle'
import { Row, Tabs, TabsProps, Table, Col, Form, Input, InputNumber} from 'antd'
import TotalMoney from './components/total-money/TotalMoney'
import { DollarCircleOutlined } from '@ant-design/icons'
import ButtonCustom from '../../components/Button'
import  { ColumnsType, TableProps } from 'antd/es/table'
import AddProduct from './components/add-product'
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';


const { TextArea } = Input;


const cx = classNames.bind(style)

// Dashboard

interface DataType {
    key: string,
    order: string,
    date: string,
    status: string,
    total: number

}

const columns: ColumnsType<DataType> = [
    {
        title: 'Order',
        dataIndex: 'order',
        key: 'order',
        render: (order) => <span>{order}</span>

    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (date) => <span>{date}</span>
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (value) => <span>{value}</span>
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (value) => <span>
            <DollarCircleOutlined />
            {value}
            </span>
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => {
            return (
                <ButtonCustom name="view" />
            )
        }
    },
]

const dataSource: DataType[] = [
    {
        key: '1',
        order: '#26112',
        date: '26-07-2022',
        status: 'hold on',
        total: 1000000

    },
    {
        key: '2',
        order: '#26112',
        date: '26-07-2022',
        status: 'hold on',
        total: 1000000

    },{
        key: '2',
        order: '#26112',
        date: '26-07-2022',
        status: 'hold on',
        total: 1000000

    }
]

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});

// Product

interface DataType_Product {
    key: React.Key;
    name: string;
    price: number;
    tag: string;
    category: string;
}

const columns_product: ColumnsType<DataType_Product> = [
    {
      title: 'Name',
      dataIndex: 'name',
      
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value: string, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Tags',
      dataIndex: 'tag',
      filters: [
        {
          text: 'Food',
          value: 'Food',
        },
        {
          text: 'Juice',
          value: 'Juice',
        },
      ],
      onFilter: (value: string, record) => record.tag.indexOf(value) === 0,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        filters: [
          {
            text: 'Pizza',
            value: 'pizza',
          },
          {
            text: 'Noodle soup',
            value: 'noodle_soup',
          },
          {
            text: 'Rice Noodle',
            value: 'rice_noodle',
          },
          {
            text: 'Rice bowl',
            value: 'rice_bowl',
          },
          {
            text: 'Beefsteak',
            value: 'beefsteak',
          },
          {
            text: 'Pasta',
            value: 'pasta',
          },
          {
            text: 'Colorful',
            value: 'colorful',
          },
          {
            text: 'Fruit Bowl',
            value: 'fruit_Bowl',
          },
          {
            text: 'Healthy',
            value: 'healthy',
          },
          {
            text: 'Ice Cream',
            value: 'ice_Cream',
          },
          {
            text: 'Mixed',
            value: 'mixed',
          },
          {
            text: 'Smoothie',
            value: 'smoothie',
          },
          {
            text: 'Shakes',
            value: 'shakes',
          },

        ],
        onFilter: (value: string, record) => record.category.indexOf(value) === 0,
      },
    {
        title: 'Action',
        dataIndex: 'action',
        
        render: (_, record) => {
            return (
                <div style={{textAlign: 'center'}}>
                    <ButtonCustom name="view" />
                    <br />
                    <ButtonCustom name="delete" />
                    <br />
                    <ButtonCustom name="update" />
                </div>
                
            )
        }
    }
  ];


const data_product = [
  {
    key: '1',
    name: 'Smoothie',
    price: 32000,
    tag: 'Juice',
    category: 'shakes'
  },
  {
      key: '2',
      name: 'Pasta',
      price: 330000,
      tag: 'Food',
      category: 'pasta'
    },
];

const onChange: TableProps<DataType_Product>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
  

export default function Admin() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
  
    const handleCancel = () => setPreviewOpen(false);
  
    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
      }
  
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
  
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
      setFileList(newFileList);
  
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: (<span className={cx("tab-header")}>Dashboard</span>),
            children: (
                <>
                    <Row gutter={16} style={{marginBottom: '40px'}}>
                        <TotalMoney name="Tổng tiền trong ngày" totalMoney='2000000'/>
                        <TotalMoney name="Tổng tiền trong tuần" totalMoney='3000000'/>
                        <TotalMoney name="Tổng tiền trong tháng" totalMoney='4000000'/>
                        <TotalMoney name="Tổng tiền trong năm" totalMoney='5000000'/>
                    </Row>
                    <Table dataSource={dataSource} columns={columns} />
    
                </>
            )
        },
        {
            key: '2',
            label: (<span className={cx("tab-header")}>New Product</span>),
            children: (
                <>
                <Row gutter={16}>
                    <Col span={8} style={{textAlign: 'center'}} className='gutter-row'>
                        <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        >
                            {fileList.length >= 4 ? null : uploadButton}
                        </Upload>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Col>
                    <Col span={16} className='gutter-row'>
                        <Form
                        name="basic"
                        layout= "vertical"
                    
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                    
                        initialValues={{ remember: true }}
                        
                        autoComplete="off"
                        className={cx("form")}
                    >
                            <Form.Item
                            label="Product Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input product name!' }]}
                            className={cx("form-label")}
                            wrapperCol={{ span: 24 }}
                            >
                            <Input className={cx("form-input")}/>
                            </Form.Item>
                            <br />
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please input product price!' }]}
                                className={cx("form-label")}
                                wrapperCol={{ span: 24 }}
                            >
                            <InputNumber className={cx("form-input")} style={{minWidth: '200px'}}/>
                            </Form.Item>
                            <br />
                            <Form.Item
                                label="Description"
                                name="s_description"
                                rules={[{ required: true, message: 'Please input short description!' }]}
                                className={cx("form-label")}
                                wrapperCol={{ span: 24 }}
                            >
                            <TextArea style={{height: '100px', padding: '10px'}} />
                            </Form.Item>
                            <br />
                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[{ required: true, message: 'Please input product category!' }]}
                                className={cx("form-label")}
                                wrapperCol={{ span: 24 }}
                            >
                            
                            <Input className={cx("form-input")}/>
                            </Form.Item>
                            <br />
                            <Form.Item
                                label="Long Description"
                                name="l_desciption"
                                
                                wrapperCol={{ span: 24 }}
                                className={cx("form-label")}
                                >
                                <TextArea style={{height: '100px', padding: '10px'}} />
                            </Form.Item>
                            <br />
                            <Form.Item
                                label="Weight"
                                name="weight"
                                rules={[{ required: true, message: 'Please input product weight!' }]}
                                wrapperCol={{ span: 24 }}
                                className={cx("form-label")}
                                >
                                <Input className={cx("form-input")}/>
                            </Form.Item>
                            <br />
                            <Form.Item
                                label="Dimensions"
                                name="dimensions"
                                rules={[{ required: true, message: 'Please input product dimensions!' }]}
                                wrapperCol={{ span: 24 }}
                                className={cx("form-label")}
                                >
                                <Input className={cx("form-input")}/>
                            </Form.Item>
                            <br />
                            <Form.Item
                                label="Tags (food/juice) "
                                name="tags"
                                rules={[{ required: true, message: 'Please input product tag!' }]}
                                wrapperCol={{ span: 24 }}
                                className={cx("form-label")}
                                >
                                <Input className={cx("form-input")}/>
                            </Form.Item>
                            <br />
                            <Form.Item wrapperCol={{ span: 24 }}>
                                <ButtonCustom name= "save change" htmlType="submit" />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                    
                </>
            )
        },
        {
            key: '3',
            label: (<span className={cx("tab-header")}>Product</span>),
            children: (
                <>
                   <Table columns={columns_product} dataSource={data_product} onChange={onChange} />
                </>
            )
        },
    ]
  return (
    <>
        <Head >
            <title>Fooce | Admin</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/icon.png" />
        </Head>
        <PageTitle name = "Admin" />
        <div className={cx("admin")}>
            <Tabs 
                defaultActiveKey="1" 
                centered = {true}
                size="small"
                className={cx("tabs")}
                tabPosition='left'
                items={items} 
            />
        </div>
    </>
  )
}


