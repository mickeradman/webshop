import React, { useState } from 'react';
import CenteredModal from '../../components/Modals/CenteredModal';
import { Product } from '../../types/types';
import ImageViewer from './ImageViewer';
import InfoWindow from './InfoWindow';

type ProductDetailsProps = {
  isOpen: boolean;
  productDetails: Product | null;
  closeModal: () => void;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  isOpen,
  productDetails,
  closeModal,
}) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <CenteredModal
      headerTitle='Produktdetaljer'
      closeModal={closeModal}
      closeImage={() => setClickedIndex(null)}
    >
      <>
        <ImageViewer
          productDetails={productDetails}
          clickedIndex={clickedIndex}
          setClickedIndex={setClickedIndex}
        />
        <InfoWindow productDetails={productDetails} />
      </>
    </CenteredModal>
  );
};

export default ProductDetails;
