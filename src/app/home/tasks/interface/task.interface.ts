export interface BasicTask {
  title: string;
  description: string;
  userId?: string;
}

export interface Task extends BasicTask {
  id?: string;
  _id?: string;
  complete: boolean;
}

