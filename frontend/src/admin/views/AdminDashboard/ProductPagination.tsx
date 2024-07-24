import React from "react";
import styled from "styled-components";

import Button from "../../../components/Button/Button";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 1.5rem 0;
  list-style: none;
  gap: 0.5rem;
  height: 2rem;
`;

type Props = {
  page: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
};

export const ProductPagination = ({
  page,
  totalPages,
  handlePageChange,
}: Props) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationWrapper>
      {pageNumbers.map((p) => (
        <Button
          key={p}
          onClick={() => handlePageChange(p)}
          disabled={p === page}
          buttonText={p.toString()}
        />
      ))}
    </PaginationWrapper>
  );
};
