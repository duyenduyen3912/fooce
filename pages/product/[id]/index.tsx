import { useRouter } from 'next/router';
import React from 'react'
import ProductDetail from '../../../module/product-detail'

export default function index(): JSX.Element  {
  const router = useRouter();
  const { id } = router.query;
  return (
    <ProductDetail  id ={id} />
  )
}
