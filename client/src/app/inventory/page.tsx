'use client';

import { useGetProductsQuery } from '@/state/api';
import Header from '@/app/(components)/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// Define the columns for the DataGrid
// Read more: https://mui.com/x/react-data-grid/column-definition/
const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (_, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (_, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];

const Inventory = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
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

  return <div className='flex flex-col'>
    <Header name='Inventory'/>
    <DataGrid
    rows={products}
    columns={columns}
    getRowId={(row) => row.productId
    } 
    checkboxSelection
    className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
    />
  </div>;
};

export default Inventory;
