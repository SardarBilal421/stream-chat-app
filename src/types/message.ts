export interface MessageData {
  text?: string;
  attachments?: Array<{
    type: string;
    url?: string;
    title?: string;
    [key: string]: unknown;
  }>;
  mentioned_users?: string[];
  parent_id?: string;
  show_in_channel?: boolean;
  [key: string]: unknown;
} 