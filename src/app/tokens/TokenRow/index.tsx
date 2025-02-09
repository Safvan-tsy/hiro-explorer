'use client';

import { FC } from 'react';
import { Tr } from '@/ui/Tr';
import { Td } from '@/ui/Td';
import { numberToString } from '@/common/utils';
import { Circle } from '@/ui/Circle';
import { Image } from '@/ui/Image';
import { Flex } from '@/ui/Flex';
import { Text } from '@/ui/typography';
import { useColorMode } from '@chakra-ui/react';
import { TokenLink, TxLink } from '@/components/links';
import { Show } from '@/ui/Show';
import { Th } from '@/ui/Th';

export const TokenRow: FC<{
  name: string;
  txId: string;
  tokenId: string;
  imgUrl?: string;
  symbol?: string;
  totalSupply?: string;
}> = ({ symbol, imgUrl, name, totalSupply, txId, tokenId }) => {
  const colorMode = useColorMode().colorMode;
  return (
    <Tr>
      <Td padding={'10px 20px 10px 16px'} width={['auto', 'auto', '30%']}>
        <Flex alignItems={'center'} gap={'8px'}>
          <Image
            width={'36px'}
            height={'36px'}
            src={imgUrl}
            fallback={
              <Circle size="36px" flexShrink={'0'}>
                {name[0].toUpperCase()}
              </Circle>
            }
          />
          <TokenLink tokenId={tokenId}>
            <Text
              as={'a'}
              fontSize={'15px'}
              whiteSpace={'nowrap'}
              textOverflow={'ellipsis'}
              overflow={'hidden'}
              color={`links.${colorMode}`}
              cursor={'pointer'}
            >
              {name} ({symbol})
            </Text>
          </TokenLink>
        </Flex>
      </Td>
      <Td padding={'10px'} display={['none', 'none', 'table-cell']}>
        <Text
          fontSize={'15px'}
          whiteSpace={'nowrap'}
          textOverflow={'ellipsis'}
          overflow={'hidden'}
          color={`links.${colorMode}`}
        >
          <TxLink txId={txId}>{txId}</TxLink>
        </Text>
      </Td>
      <Td isNumeric width={'130px'} padding={'10px 16px 10px 20px'}>
        <Text whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'} fontSize={'15px'}>
          {numberToString(totalSupply ? Number(totalSupply) : 0)}
        </Text>
      </Td>
    </Tr>
  );
};
