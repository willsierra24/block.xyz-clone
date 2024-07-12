import React, { useEffect } from 'react';
import axios from 'axios';
import * as auth from 'https://unpkg.com/@tidal-music/auth/dist';
import { setCredentialsProvider } from 'https://unpkg.com/@tidal-music/player-web-components/dist';
import {Accessibility, PlayArrow, DragIndicator} from '@mui/icons-material';

const clientId = 'Btt0eiBn3dI5ul84';
const clientSecret = '6tUSaPCQlMekTnCwLVpuLjvLZfg00PGyPaYAuiRKfmI=';

const TidalPlayer = () => {
  useEffect(() => {
    const initializeTidal = async () => {
      try {
        await auth.init({
          clientId,
          clientSecret,
          credentialsStorageKey: 'key',
          scopes: [],
        });

        setCredentialsProvider(auth.credentialsProvider);
      } catch (error) {
        console.error('Error initializing TIDAL:', error);
      }
    };

    initializeTidal();
  }, []);

  return (
    <tidal-play-trigger product-id="55181391" product-type="track">
      <PlayArrow></PlayArrow>
    </tidal-play-trigger>
  );
};

export default TidalPlayer;
