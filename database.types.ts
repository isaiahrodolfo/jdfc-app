export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      devotionals: {
        Row: {
          created_at: string
          id: number
          lesson_id: number
          link: string
        }
        Insert: {
          created_at?: string
          id?: number
          lesson_id: number
          link: string
        }
        Update: {
          created_at?: string
          id?: number
          lesson_id?: number
          link?: string
        }
        Relationships: [
          {
            foreignKeyName: "devotionals_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      education_lesson: {
        Row: {
          created_at: string
          id: number
          slideshow_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          slideshow_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          slideshow_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "education_lesson_slideshow_id_fkey"
            columns: ["slideshow_id"]
            isOneToOne: false
            referencedRelation: "slideshows"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          created_at: string
          date: string | null
          id: number
          is_favorited: boolean
          series_id: number | null
          title: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: number
          is_favorited?: boolean
          series_id?: number | null
          title: string
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: number
          is_favorited?: boolean
          series_id?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "series"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons_series: {
        Row: {
          created_at: string
          id: number
          lesson_id: number
          lesson_number: number | null
          series_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          lesson_id: number
          lesson_number?: number | null
          series_id: number
        }
        Update: {
          created_at?: string
          id?: number
          lesson_id?: number
          lesson_number?: number | null
          series_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "lessons_series_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_series_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "series"
            referencedColumns: ["id"]
          },
        ]
      }
      live_slideshows: {
        Row: {
          created_at: string
          current_slide: number | null
          id: number
          slideshow_id: number
        }
        Insert: {
          created_at?: string
          current_slide?: number | null
          id?: number
          slideshow_id: number
        }
        Update: {
          created_at?: string
          current_slide?: number | null
          id?: number
          slideshow_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "live_slideshows_slideshow_id_fkey"
            columns: ["slideshow_id"]
            isOneToOne: false
            referencedRelation: "slideshows"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      series: {
        Row: {
          created_at: string
          id: number
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      sermons: {
        Row: {
          created_at: string
          id: number
          slideshow_id: number
          youtube_link: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          slideshow_id: number
          youtube_link?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          slideshow_id?: number
          youtube_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sermons_slideshow_id_fkey"
            columns: ["slideshow_id"]
            isOneToOne: false
            referencedRelation: "slideshows"
            referencedColumns: ["id"]
          },
        ]
      }
      slideshows: {
        Row: {
          created_at: string
          id: number
          is_live: boolean
          lesson_id: number
          slideshow_link: string | null
          speaker_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_live?: boolean
          lesson_id: number
          slideshow_link?: string | null
          speaker_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          is_live?: boolean
          lesson_id?: number
          slideshow_link?: string | null
          speaker_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "slideshows_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      todos: {
        Row: {
          id: number
          title: string
        }
        Insert: {
          id?: never
          title: string
        }
        Update: {
          id?: never
          title?: string
        }
        Relationships: []
      }
      users_lessons: {
        Row: {
          created_at: string
          id: number
          lesson_id: number
          notes: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          lesson_id: number
          notes?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          lesson_id?: number
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_lessons_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
