import { Typography } from '@mui/material';

export const ProductCard = ({ product }) => {
  return (
    <div className='w-full flex justify-between items-center mb-16'>
      <img src={product.images?.[0]} width={70} height={80} />
      <div className='w-full p-8'>
        <Typography className='font-bold'>{product.title}</Typography>
        {product.discountedPrice ? (
          <div className='flex  w-full'>
            <Typography
              className='mr-16'
              style={{ textDecoration: 'line-through' }}
              color='text.secondary'
            >
              {product.price} PKR
            </Typography>
            <Typography color='text.secondary'>
              {product.discountedPrice} PKR
            </Typography>
          </div>
        ) : (
          <Typography color='text.secondary'>{product.price} PKR</Typography>
        )}
      </div>
    </div>
  );
};
