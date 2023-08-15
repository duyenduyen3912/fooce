import { Button, Col, Input, InputNumber, Pagination, Row, Select, Slider, Space } from 'antd'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import classNames from 'classnames/bind'
import style from "./Product.module.scss"
import Product from '../../components/product'
import { DollarCircleOutlined, MehOutlined, SearchOutlined } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import { useQuery } from 'react-query'
import { getProductList } from '../../api/ApiProduct'
import { formatCurrency } from '../../constant/currencyFormatter'



const cx = classNames.bind(style)
export default function Juice() {
  const [inputValue, setInputValue] = useState(10000);
  const [sortValue, setSortValue] = useState('rating')
  const [currentPage, setCurrentPage] = useState(1);
  const [juice, setJuice] = useState([])

  const handleChange = (value: string) => {
    setSortValue(value)
    if(value === 'low'){
      const sortedLow = [...juice].sort((a, b) => a.price - b.price);
      setJuice(sortedLow)
    } else if( value === 'high') {
      const sortedHigh = [...juice].sort((a, b) => b.price - a.price);
      setJuice(sortedHigh)
    } else if (value === 'popularity'){
    } else if(value === 'rating'){
      setJuice(data?.data)
    }
  };

  const handlePageChange = (page) => {
    console.log(page)
    setCurrentPage(page);
  };

  const onChange = (newValue: number) => {
    setInputValue(newValue);
  }

  const handleClickFilter = () => {
    
    const filterJuice = []
    const filterPrice = [...juice].map((item, index) => {
      if(parseInt(item.price, 10) <= inputValue){
        filterJuice.push(item)
      }
    })
    setJuice(filterJuice)
    
  }

  const handleClickReset = () => {
    setJuice(data?.data)
    setInputValue(10000)
  }

  const {isLoading, isError, isFetching, data, error} = useQuery(['JuiceList', currentPage], () => getProductList({
    tag: "Juice",
    indexPage: currentPage.toString()
  }));

  useEffect(()=> {
    if(data) {
      setJuice(data.data)
    }
      
    
  }, [data])

  return (
    <>
         <Head >
            <title>Fooce | Juice</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/icon.png" />
        </Head>
        <PageTitle name= "Juice" />
        <div className={cx("product")}>
            <Row justify={'space-between'}>
                <Col span={17} className="gutter-row">
                  <div className={cx("sort")}>
                        <div className={cx("product-number")}>
                          {
                            juice.length != 0 ? `Showing ${(currentPage - 1) * 12 + 0 + 1} – ${(currentPage - 1) * 12 + (juice.length) -1 + 1} of ${data?.total_products}  results` : "Dont't have product to show"
                          }
                              
                        </div>
                        
                        <Space wrap>
                          <Select
                            defaultValue="rating"
                            style={{ width: 200 }}
                            onChange={handleChange}
                            value={sortValue}
                            options={[
                              { label: 'Sort by popularity', value: 'popularity' },
                              { label: 'Sort by average rating', value: 'rating' },
                              { label: 'Sort by price: low to high', value: 'low' },
                              { label: 'Sort by price: high to low', value: 'high' },
                            ]}
                          />
                          
                        </Space>
                  </div>
                  <Row className={cx("row-product")} gutter={16}>
                    { juice?.length != 0 ? 
                      <>
                      {juice?.map((item, index) => (
                        <Product 
                          key={item.id} 
                          id={item.id}
                          name={item.name} 
                          price={item.price}
                          image={item.image}
                          category={item.category}
                          description={item.description}
                          long_description={item.long_description}
                          size={item.size}
                          tag={item.tag}
                          weight={item.weight}
                          star={item.Star}
                          col={8}
                        />
                      ))}
                      <Pagination
                        current={currentPage}
                        total={data?.total_products} 
                        pageSize={9}
                        onChange={handlePageChange}
                        className={cx("pagination")}
                      />
                    </>
                       : 
                      <div style={{textAlign: 'center', width: '100%', marginTop: '30px'}}>
                        <MehOutlined style={{color: '#5a5a5a', fontSize: '30px'}}/>
                      <p className={cx("notifications")}>Sorry, we don't have any products that match your request</p>
                      </div>
                    }
                  </Row>
                  
                </Col>
                <Col span={6} className="gutter-row">
                <div className={cx('filter-price')}>
                  Filter by price
                </div>
                <Row justify='space-between'>
                  <Col span={16}>
                    <Slider
                      min={0}
                      max={100000}
                      step={10000}
                      onChange={onChange}
                      value={typeof inputValue === 'number' ? inputValue : 0}
                      trackStyle={{backgroundColor: '#abe9b0'}}
                      railStyle={{backgroundColor: '#E5E5E5'}}
                      handleStyle={{}}
                    />
                    </Col>
                    <Col span={6}>
                      <InputNumber
                        min={10000}
                        max={100000}
                        style={{width: '100%'}}
                        value={inputValue}
                        onChange={onChange}
                      />
                    </Col>
                </Row>
                <div className={cx('price-range-wrap')}>
                  <div className={cx('price-range')}>
                    Price: <DollarCircleOutlined style={{color: '#5a5a5a', fontSize: '16px'}}/> 0 - <DollarCircleOutlined style={{color: '#5a5a5a', fontSize: '16px'}}/> {formatCurrency(inputValue)}
                  </div>
                  
                  <div className={cx('price-range-btn')}>
                    <Button className={cx('btn')} onClick= {handleClickFilter}>filter</Button>
                    <Button className={cx('btn', 'btn-reset')} onClick= {handleClickReset}>reset</Button>
                  </div>
                  </div>
                <div className={cx('product-category')}>
                  <div className={cx('filter-price')}>
                    Product categories
                  </div>
                    <div className={cx('category-item')}>
                        Colorful
                    </div>
                    <div className={cx('category-item')}>
                        Fruit Bowl
                    </div>
                    <div className={cx('category-item')}>
                        Healthy
                    </div>
                    <div className={cx('category-item')}>
                        Ice Cream
                    </div>
                    <div className={cx('category-item')}>
                        Mixed
                    </div>
                    <div className={cx('category-item')}>
                        Smoothie
                    </div>
                    <div className={cx('category-item')}>
                        Shakes
                    </div>
                </div>
                <div className={cx('product-search')}>
                  <Input size="large" placeholder="search product..." prefix={<SearchOutlined style={{color: '#abe9b0', fontWeight: '600', fontSize: '17px' }}/>} className={cx("search-input")}/>
                </div>
                </Col>
            </Row>
        </div>
    </>
  )
}
