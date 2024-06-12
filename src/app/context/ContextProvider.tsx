'use client';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { EthersExtension } from '@dynamic-labs/ethers-v6';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import React, { ReactNode } from 'react';

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const cssOverrides = `
  

    .dynamic-widget-inline-controls{
      background-color: rgba(209, 236, 255, 0.2); 
      border-radius:6px;
      
    }

    div.dynamic-widget-inline-controls > div:nth-child(1){
      display:none;
    }

    .dynamic-widget-inline-controls__network-picker.evm-network-control__container{
      display:none;
    }

    .overlay-card--content{
      background-color: rgba(209, 236, 255, 0.2); 
      backdrop-filter: blur(4px);

    }

    .dynamic-widget-inline-controls__network-picker-list{
      background-color: rgba(209, 236, 255, 0.2); 
      backdrop-filter: blur(4px);
    }

    .dynamic-widget-card{
      background-color: rgba(209, 236, 255, 0.2); 

    }

    .button--primary{
      background-color: rgba(209, 236, 255, 0.2); 
      backdrop-filter: blur(4px);
    }
   
    

    .connect-button:hover:enabled{
      background-color: rgba(209, 236, 255, 0.5); 
      backdrop-filter: blur(10px);
    }

    .wallet-list-item__tile.list-tile:hover:enabled{
      background-color: rgba(209, 236, 255, 0.5); 
      backdrop-filter: blur(10px);
    }

    .list-item-button:hover:enabled{
      background-color: rgba(209, 236, 255, 0.5); 
      backdrop-filter: blur(10px);
    }

    .widget-portal .widget-portal__container{
      background-color: rgba(209, 236, 255, 0.2); 
      backdrop-filter: blur(4px);
    }

    .user-profile__fields, 
    .embedded-reveal-view__body__card,
    .embedded-reveal-view__body__confirm_card,
    .passkey-card{
      background-color: rgba(209, 236, 255, 0.2); 
      border:1px solid white;
      color:white;
      backdrop-filter: blur(4px);
    }

    .wallet-settings-view__body__section__title{
      color:white;
    }


    .icon-with-spinner__spinner-container icon-with-spinner__animation svg{
      fill:white;
    }

    .modal-card{
      background-color: rgba(209, 236, 255, 0.2); 
      border:1px solid white;
      backdrop-filter: blur(4px);
    }

    .chip{
      background-color: rgba(209, 236, 255, 0.2); 
      border:1px solid white;
      color:white;
      backdrop-filter: blur(4px);
    }

    .token-balance-card{
      background-color: rgba(209, 236, 255, 0.2); 
      border:1px solid white;
      color:white;
      backdrop-filter: blur(4px);
    }

    .input__container .input__label{
      color:white;
    }

    .input__container input::placeholder{
      color:white;

    }

    .transaction-confirmation__content, .action-card, .embedded-reveal-view__body__card, .embedded-reveal-view__body__confirm_card{
      background-color: rgba(209, 236, 255, 0.2); 
      border:1px solid white;
      color:white;
      backdrop-filter: blur(4px);
    }


    .input__container .input:not(.input__error):focus, .input__container .input:not(.input__error):hover, .wallet-settings-view__body__section__title{
      color:white;
    }

    .wallet-settings-view__body__section__button__icon{
      color:white;

    }

    .badge__container{
      background-color: rgba(209, 236, 255, 0.2); 
      border:1px solid white;
      color:white;
      backdrop-filter: blur(4px);
    }

    .transaction-status-layout__content{
      background-color: rgba(209, 236, 255, 0.2); 
      border:1px solid white;
      color:white;
      backdrop-filter: blur(4px);
    }

    input:-webkit-autofill, input:-webkit-autofill:active, input:-webkit-autofill:focus, input:-webkit-autofill:hover, select:-webkit-autofill, select:-webkit-autofill:focus, select:-webkit-autofill:hover, textarea:-webkit-autofill, textarea:-webkit-autofill:focus, textarea:-webkit-autofill:hover{
      -webkit-text-fill-color:white!important;
      color:white!important;
    }

    .user-profile__fields{
      background-color: rgba(209, 236, 255, 0.2); 
      border:1px solid white;
      color:white;
      backdrop-filter: blur(4px);
    }

   
    .social-sign-in--tile__full-width{
      background-color: rgba(209, 236, 255, 0.2); 
      border:1px solid white;
      backdrop-filter: blur(4px);
    }

    .social-sign-in--tile__full-width:hover:enabled{
      background-color: rgba(209, 236, 255, 0.5); 
      border:1px solid white;
      backdrop-filter: blur(4px);
    }

    .button--padding-login-screen-height{
      background-color: rgba(209, 236, 255, 0.2); 
      border:1px solid white;
      backdrop-filter: blur(4px);
    }

      .input__container .input{
        background-color: rgba(209, 236, 255, 0.2); 
        border:1px solid white;
        backdrop-filter: blur(4px);
        color:white;
      }
      .input__container--dense .input__label{
        color:white;
      }

      .pending-signature__container .pending-signature__copy{
        color:white;
      }

      .input__container .input:not(.input__error):focus, .input__container .input:not(.input__error):hover{
        background-color: rgba(209, 236, 255, 0.2); 
        border:1px solid white;
        backdrop-filter: blur(4px);
        color:white;
      }

      .button--primary{
        padding: 8px 15px;
        border-radius:6px;
      }
      .connect-button .typography{
        color:white;
      }

    .wallet-list-item__tile{
      background-color: rgba(209, 236, 255, 0.2); 
      border:1px solid white;
      backdrop-filter: blur(4px);
    }

    .active-wallet-information-container{
      background-color: rgba(209, 236, 255, 0.2); 
      border:1px solid white;
      backdrop-filter: blur(4px);
    }
    .dropdown{
      background-color: rgba(209, 236, 255, 0.2); 
      border:1px solid white;
      backdrop-filter: blur(4px);
    }

    .evm-network-control__container{
      background-color: rgba(209, 236, 255, 0.2); 
      backdrop-filter: blur(4px);

      }

      .active-wallet-information__dots-menu{
        color:white;

      } 


      .active-wallet-information__dots-menu svg{
        stroke:white;
      } 


    .typography{
      color:white!important;
    }

    .icon-button svg{
      fill:white!important;
    }

    .icon--color-text-primary{
      color:white;
    }
  `;

  return (
    <DynamicContextProvider
      settings={{
        environmentId: 'c130bdd5-31c5-4688-bb4e-9b7f7f0db942',
        walletConnectors: [EthereumWalletConnectors],
        networkValidationMode: 'always',
        walletConnectorExtensions: [EthersExtension],
        cssOverrides,
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};

export default ContextProvider;
