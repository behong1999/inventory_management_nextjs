'use client';
import { useAddProductMutation, useGetProductsQuery } from '@/state/api';
import { PlusCircleIcon, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Header from '@/app/(components)/Header';
import Rating from '@/app/(components)/Rating';
import AddProductModal from './AddProductModal';
import Image from 'next/image';

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [randomImages, setRandomImages] = useState<number[]>([]);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  useEffect(() => {
    if (products) {
      // Generate random image indices for products
      const images = products.map(() => Math.floor(Math.random() * 3) + 1);
      setRandomImages(images);
    }
  }, [products]);

  const [addProduct] = useAddProductMutation();
  const handleAddProduct = async (productData: ProductFormData) => {
    await addProduct(productData);
  };

  if (isLoading) {
    return <div className='py-4'>Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className='py-4 text-red-500 text-center'>
        Failed to fetch products
      </div>
    );
  }
  return (
    <div className='pb-5 mx-auto w-full'>
      {/* SEARCH BAR */}
      <div className='mb-6'>
        <div className='flex items-center border-2 border-gray-200 rounded'>
          <SearchIcon className='w-5 h-5 text-gray-500 m-2' />
          <input
            className='w-full py-2 px-4 rounded bg-white'
            placeholder='Search products...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className='flex justify-between items-center mb-6'>
        <Header name='Products' />
        <button
          className='flex bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded'
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className='w-6 h-6 mr-2' />
          Add Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products.map((product, index) => (
            <div
              key={product.productId}
              className='shadow rounded-md border border-gray-200 p-4 max-w-full w-full mx-auto' // "max-w-full w-full" prevents overflow and fills the available space
            >
              <div className='flex flex-col items-center'>
                <Image
                  src={`https://s3-inventorymanagement-practice.s3.us-east-1.amazonaws.com/product${
                   randomImages[index]
                  }.png`}
                  alt={product.name}
                  width={150}
                  height={150}
                  className='mb-3 rounded-2xl w-36 h-36'
                />
                <h3 className='text-lg text-gray-900 font-semibold'>
                  {product.name}
                </h3>
                <p className='text-gray-800'>${product.price.toFixed(2)}</p>
                <div className='text-sm text-gray-600 mt-1'>
                  Stock: {product.stockQuantity}
                </div>
                {product.rating !== undefined && (
                  <div className='flex items-center mt-2'>
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleAddProduct}
      />
    </div>
  );
};

export default Products;
