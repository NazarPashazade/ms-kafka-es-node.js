import { CartRepositoryType } from "../types/repository.type";

export const CartService = {
  create: async (data: any, repo: CartRepositoryType) => {
    return await repo.create(data);
  },
  update: async (id: number, data: any, repo: CartRepositoryType) => {
    return await repo.update(id, data);
  },
  delete: async (id: number, repo: CartRepositoryType) => {
    return await repo.delete(id);
  },
  get: async (repo: CartRepositoryType) => {
    return await repo.find();
  },
};
