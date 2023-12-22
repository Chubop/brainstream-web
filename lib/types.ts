import { type Message } from 'ai'

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export interface Stream {
  action_use: any[];
  audio_files: any[];
  audio_use: number;
  chat_history: any;
  created_date: Date;
  data_files: any[];
  embedding_token_use: number;
  files_use: number;
  last_updated: Date;
  llm_completion_token_use: number;
  llm_prompt_token_use: number;
  llm_token_use_total: number;
  stream_id: string;
  stream_name: string;
  user_id: string;
}

export interface Message {
  additiona_kwargs: any[],
  content: string,
  role: string,
  isLoading: boolean
}


export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>
