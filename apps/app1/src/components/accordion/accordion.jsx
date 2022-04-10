import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

export const Accordion = ({ children: _children, defaultExpanded = false, ...rest }) => {
  const children = React.Children.toArray(_children);
  const content = children.find(child => child.type === Content);

  return (
      <Wrapper >
          <div>
              {content}
          </div>
      </Wrapper>
  )

}