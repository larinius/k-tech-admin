import { useQuery } from 'react-query';
import type { Post } from '@/interfaces/postInterface';
import type { Category } from '@/interfaces/categoryInterface';
import type { User } from '@/interfaces/userInterface';

interface UsePostsResult {
  isLoading: boolean;
  error: Error | unknown;
  refetch: () => void;
  posts: Post[];
}

interface UsePostResult {
  isLoading: boolean;
  error: Error | unknown;
  refetch: () => void;
  post: Post;
}

interface UseCategoriesResult {
  isLoading: boolean;
  error: Error | unknown;
  refetch: () => void;
  categories: Category[];
}

interface UseUsersResult {
  isLoading: boolean;
  error: Error | unknown;
  refetch: () => void;
  users: User[];
}

export function usePosts(): UsePostsResult {
  const queryUrl = `${import.meta.env.VITE_APP_API_BASE}/post`;

  const { isLoading, error, data, refetch } = useQuery(
    ['posts'],
    () => fetch(queryUrl).then((response) => response.json()),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      retry: 0,
    },
  );

  const posts = data?.posts || [];

  return { isLoading, error, refetch, posts };
}

export function usePost(id: number | null): UsePostResult {
  const queryUrl = `${import.meta.env.VITE_APP_API_BASE}/post/${id}`;
  const isEnabled = id ? true : false;

  const { isLoading, error, data, refetch } = useQuery(
    ['post', id],
    () => fetch(queryUrl).then((response) => response.json()),
    {
      enabled: isEnabled,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      retry: 0,
    },
  );

  const post = data?.post || {};

  return { isLoading, error, refetch, post };
}

export function useCategories(): UseCategoriesResult {
  const queryUrl = `${import.meta.env.VITE_APP_API_BASE}/category`;

  const { isLoading, error, data, refetch } = useQuery(
    ['categories'],
    () => fetch(queryUrl).then((response) => response.json()),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      retry: 0,
    },
  );

  const categories = data?.categories || [];

  return { isLoading, error, refetch, categories };
}

export function useUsers(): UseUsersResult {
  const queryUrl = `${import.meta.env.VITE_APP_API_BASE}/user`;

  const { isLoading, error, data, refetch } = useQuery(
    ['users'],
    () => fetch(queryUrl).then((response) => response.json()),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      retry: 0,
    },
  );

  const users = data?.users || [];

  return { isLoading, error, refetch, users };
}
