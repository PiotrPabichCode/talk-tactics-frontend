'use client';
import { getUserDetails } from '@/services/api/auth.service';
import {
  getCourses,
  getUserCoursesPreviewByUserId,
} from '@/services/api/course.service';
import useAuthStore, { IAuthStore } from '@/store/useAuthStore';
import useStore from '@/store/useStore';
import useUserStore from '@/store/useUserStore';
import { useEffect } from 'react';

const StoreHydration = () => {
  const authStore = useStore<IAuthStore, IAuthStore>(
    useAuthStore,
    (state) => state
  );

  useEffect(() => {
    if (!authStore) {
      return;
    }
    if (!useAuthStore.persist.hasHydrated()) {
      useAuthStore.persist.onFinishHydration(async (state) => {
        await getCourses();
        if (!state.credentials?.username) {
          useUserStore.getState().setLoading(false);
        } else {
          await getUserDetails({
            username: state.credentials?.username ?? 'none',
          });
          await getUserCoursesPreviewByUserId({ id: state.credentials.id });
        }
      });
      /**
       * Manual rehydrate store when available
       * @example https://docs.pmnd.rs/zustand/integrations/persisting-store-data#usage-in-next.js
       */
      useAuthStore.persist.rehydrate();
    }
  }, [authStore]);

  return null;
};

export default StoreHydration;
