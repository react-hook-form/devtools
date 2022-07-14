import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { PLACEMENT } from '../../../../src/position';
import Form1 from '../../components/forms/Form1';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { placement: context.params?.placement } };
};

const Placement: NextPage<{ placement: PLACEMENT }> = ({
  placement,
}: {
  placement: PLACEMENT;
}) => {
  return <Form1 placement={placement} />;
};

export default Placement;
