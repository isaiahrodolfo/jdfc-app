
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  
  "graphql_public": {
          Tables: {
            [_ in never]: never
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "graphql":
{ Args: { "extensions"?: Json,"operationName"?: string,"query"?: string,"variables"?: Json }; Returns: Json
                           }
          }
          Enums: {
            [_ in never]: never
          }
          CompositeTypes: {
            [_ in never]: never
          }
        },"public": {
          Tables: {
            "announcements": {
                  Row: {
                    "announcement_end": string | null,"category": string | null,"color": string | null,"created_at": string,"id": number,"information": string | null,"name": string | null
                  }
                  Insert: {
                    "announcement_end"?: string | null,"category"?: string | null,"color"?: string | null,"created_at"?: string,"id"?: number,"information"?: string | null,"name"?: string | null
                  }
                  Update: {
                    "announcement_end"?: string | null,"category"?: string | null,"color"?: string | null,"created_at"?: string,"id"?: number,"information"?: string | null,"name"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"church_lessons": {
                  Row: {
                    "created_at": string,"id": number,"lesson_id": number | null,"lesson_number": number,"series_id": number
                  }
                  Insert: {
                    "created_at"?: string,"id"?: number,"lesson_id"?: number | null,"lesson_number": number,"series_id": number
                  }
                  Update: {
                    "created_at"?: string,"id"?: number,"lesson_id"?: number | null,"lesson_number"?: number,"series_id"?: number
                  }
                  Relationships: [
                    {
      foreignKeyName: "church_lessons_lesson_id_fkey"
      columns: ["lesson_id"]
isOneToOne: false
      referencedRelation: "lessons"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "church_lessons_series_id_fkey"
      columns: ["series_id"]
isOneToOne: false
      referencedRelation: "series"
      referencedColumns: ["id"]
    }
                  ]
                },"devotion_lessons": {
                  Row: {
                    "created_at": string,"date": string,"id": number,"lesson_id": number | null,"odb_link": string
                  }
                  Insert: {
                    "created_at"?: string,"date": string,"id"?: number,"lesson_id"?: number | null,"odb_link": string
                  }
                  Update: {
                    "created_at"?: string,"date"?: string,"id"?: number,"lesson_id"?: number | null,"odb_link"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "devotion_lessons_lesson_id_fkey"
      columns: ["lesson_id"]
isOneToOne: false
      referencedRelation: "lessons"
      referencedColumns: ["id"]
    }
                  ]
                },"event_availabilities": {
                  Row: {
                    "created_at": string,"id": number,"name": string | null
                  }
                  Insert: {
                    "created_at"?: string,"id"?: number,"name"?: string | null
                  }
                  Update: {
                    "created_at"?: string,"id"?: number,"name"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"events": {
                  Row: {
                    "announcement_start": string | null,"created_at": string,"event_type_id": number | null,"id": number,"information": string | null,"is_online": boolean,"life_group_id": number | null,"location": string | null,"repeat_every_days": number | null,"timestamp": string | null,"timestamp_end": string | null,"title": string | null
                  }
                  Insert: {
                    "announcement_start"?: string | null,"created_at"?: string,"event_type_id"?: number | null,"id"?: number,"information"?: string | null,"is_online"?: boolean,"life_group_id"?: number | null,"location"?: string | null,"repeat_every_days"?: number | null,"timestamp"?: string | null,"timestamp_end"?: string | null,"title"?: string | null
                  }
                  Update: {
                    "announcement_start"?: string | null,"created_at"?: string,"event_type_id"?: number | null,"id"?: number,"information"?: string | null,"is_online"?: boolean,"life_group_id"?: number | null,"location"?: string | null,"repeat_every_days"?: number | null,"timestamp"?: string | null,"timestamp_end"?: string | null,"title"?: string | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "events_life_group_id_fkey"
      columns: ["life_group_id"]
isOneToOne: false
      referencedRelation: "life_groups"
      referencedColumns: ["id"]
    }
                  ]
                },"lessons": {
                  Row: {
                    "created_at": string,"id": number,"is_user_completable": boolean,"tags": Json | null,"title": string | null
                  }
                  Insert: {
                    "created_at"?: string,"id"?: number,"is_user_completable"?: boolean,"tags"?: Json | null,"title"?: string | null
                  }
                  Update: {
                    "created_at"?: string,"id"?: number,"is_user_completable"?: boolean,"tags"?: Json | null,"title"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"lessons_events": {
                  Row: {
                    "created_at": string,"event_id": number,"id": number,"lesson_id": number
                  }
                  Insert: {
                    "created_at"?: string,"event_id": number,"id"?: number,"lesson_id": number
                  }
                  Update: {
                    "created_at"?: string,"event_id"?: number,"id"?: number,"lesson_id"?: number
                  }
                  Relationships: [
                    {
      foreignKeyName: "lessons_events_event_id_fkey"
      columns: ["event_id"]
isOneToOne: false
      referencedRelation: "events"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "lessons_events_lesson_id_fkey"
      columns: ["lesson_id"]
isOneToOne: false
      referencedRelation: "lessons"
      referencedColumns: ["id"]
    }
                  ]
                },"lessons_events_link": {
                  Row: {
                    "created_at": string,"id": number,"is_live": boolean | null,"lessons_events_id": number | null,"livestream_link": string | null
                  }
                  Insert: {
                    "created_at"?: string,"id"?: number,"is_live"?: boolean | null,"lessons_events_id"?: number | null,"livestream_link"?: string | null
                  }
                  Update: {
                    "created_at"?: string,"id"?: number,"is_live"?: boolean | null,"lessons_events_id"?: number | null,"livestream_link"?: string | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "lessons_events_link_lessons_events_id_fkey"
      columns: ["lessons_events_id"]
isOneToOne: false
      referencedRelation: "lessons_events"
      referencedColumns: ["id"]
    }
                  ]
                },"lessons_events_slides": {
                  Row: {
                    "created_at": string,"id": number,"lessons_events_id": number | null,"slides_link": string | null
                  }
                  Insert: {
                    "created_at"?: string,"id"?: number,"lessons_events_id"?: number | null,"slides_link"?: string | null
                  }
                  Update: {
                    "created_at"?: string,"id"?: number,"lessons_events_id"?: number | null,"slides_link"?: string | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "lessons_events_slides_lessons_events_id_fkey"
      columns: ["lessons_events_id"]
isOneToOne: false
      referencedRelation: "lessons_events"
      referencedColumns: ["id"]
    }
                  ]
                },"lessons_events_speakers": {
                  Row: {
                    "created_at": string,"id": number,"lessons_events_id": number | null,"user_id": string | null
                  }
                  Insert: {
                    "created_at"?: string,"id"?: number,"lessons_events_id"?: number | null,"user_id"?: string | null
                  }
                  Update: {
                    "created_at"?: string,"id"?: number,"lessons_events_id"?: number | null,"user_id"?: string | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "lessons_events_speakers_lessons_events_id_fkey"
      columns: ["lessons_events_id"]
isOneToOne: false
      referencedRelation: "lessons_events"
      referencedColumns: ["id"]
    }
                  ]
                },"life_group_events_members": {
                  Row: {
                    "created_at": string,"event_availability_id": number | null,"event_id": number | null,"id": number,"user_id": string | null
                  }
                  Insert: {
                    "created_at"?: string,"event_availability_id"?: number | null,"event_id"?: number | null,"id"?: number,"user_id"?: string | null
                  }
                  Update: {
                    "created_at"?: string,"event_availability_id"?: number | null,"event_id"?: number | null,"id"?: number,"user_id"?: string | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "life_group_events_members_event_availability_id_fkey"
      columns: ["event_availability_id"]
isOneToOne: false
      referencedRelation: "event_availabilities"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "life_group_events_members_event_id_fkey"
      columns: ["event_id"]
isOneToOne: false
      referencedRelation: "events"
      referencedColumns: ["id"]
    }
                  ]
                },"life_group_roles": {
                  Row: {
                    "created_at": string,"id": number,"name": string | null
                  }
                  Insert: {
                    "created_at"?: string,"id"?: number,"name"?: string | null
                  }
                  Update: {
                    "created_at"?: string,"id"?: number,"name"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"life_groups": {
                  Row: {
                    "created_at": string,"id": number,"name": string | null
                  }
                  Insert: {
                    "created_at"?: string,"id"?: number,"name"?: string | null
                  }
                  Update: {
                    "created_at"?: string,"id"?: number,"name"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"profiles": {
                  Row: {
                    "avatar_link": string | null,"birthday": string | null,"facebook_link": string | null,"full_name": string | null,"id": string,"instagram_link": string | null,"is_life_group_admin": boolean,"life_group_id": number | null,"life_group_role_id": number | null,"track_id": number | null,"updated_at": string | null
                  }
                  Insert: {
                    "avatar_link"?: string | null,"birthday"?: string | null,"facebook_link"?: string | null,"full_name"?: string | null,"id": string,"instagram_link"?: string | null,"is_life_group_admin"?: boolean,"life_group_id"?: number | null,"life_group_role_id"?: number | null,"track_id"?: number | null,"updated_at"?: string | null
                  }
                  Update: {
                    "avatar_link"?: string | null,"birthday"?: string | null,"facebook_link"?: string | null,"full_name"?: string | null,"id"?: string,"instagram_link"?: string | null,"is_life_group_admin"?: boolean,"life_group_id"?: number | null,"life_group_role_id"?: number | null,"track_id"?: number | null,"updated_at"?: string | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "profiles_life_group_id_fkey"
      columns: ["life_group_id"]
isOneToOne: false
      referencedRelation: "life_groups"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "profiles_life_group_role_id_fkey"
      columns: ["life_group_role_id"]
isOneToOne: false
      referencedRelation: "life_group_roles"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "profiles_track_id_fkey"
      columns: ["track_id"]
isOneToOne: false
      referencedRelation: "tracks"
      referencedColumns: ["id"]
    }
                  ]
                },"series": {
                  Row: {
                    "created_at": string,"id": number,"name": string | null,"series_number": number | null,"track_id": number
                  }
                  Insert: {
                    "created_at"?: string,"id"?: number,"name"?: string | null,"series_number"?: number | null,"track_id": number
                  }
                  Update: {
                    "created_at"?: string,"id"?: number,"name"?: string | null,"series_number"?: number | null,"track_id"?: number
                  }
                  Relationships: [
                    {
      foreignKeyName: "series_track_id_fkey"
      columns: ["track_id"]
isOneToOne: false
      referencedRelation: "tracks"
      referencedColumns: ["id"]
    }
                  ]
                },"todos": {
                  Row: {
                    "id": number,"title": string
                  }
                  Insert: {
                    "id"?: never,"title": string
                  }
                  Update: {
                    "id"?: never,"title"?: string
                  }
                  Relationships: [
                    
                  ]
                },"tracks": {
                  Row: {
                    "created_at": string,"heading": string | null,"id": number,"name": string | null
                  }
                  Insert: {
                    "created_at"?: string,"heading"?: string | null,"id"?: number,"name"?: string | null
                  }
                  Update: {
                    "created_at"?: string,"heading"?: string | null,"id"?: number,"name"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"users_lessons": {
                  Row: {
                    "created_at": string,"id": number,"lesson_id": number | null,"notes": string | null,"tags": Json | null,"user_id": string | null
                  }
                  Insert: {
                    "created_at"?: string,"id"?: number,"lesson_id"?: number | null,"notes"?: string | null,"tags"?: Json | null,"user_id"?: string | null
                  }
                  Update: {
                    "created_at"?: string,"id"?: number,"lesson_id"?: number | null,"notes"?: string | null,"tags"?: Json | null,"user_id"?: string | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "users_lessons_lesson_id_fkey"
      columns: ["lesson_id"]
isOneToOne: false
      referencedRelation: "lessons"
      referencedColumns: ["id"]
    }
                  ]
                },"users_lessons_completions": {
                  Row: {
                    "created_at": string,"id": number,"is_completed": boolean | null,"lesson_id": number,"user_id": string
                  }
                  Insert: {
                    "created_at"?: string,"id"?: number,"is_completed"?: boolean | null,"lesson_id": number,"user_id": string
                  }
                  Update: {
                    "created_at"?: string,"id"?: number,"is_completed"?: boolean | null,"lesson_id"?: number,"user_id"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "users_lessons_completion_lesson_id_fkey"
      columns: ["lesson_id"]
isOneToOne: false
      referencedRelation: "lessons"
      referencedColumns: ["id"]
    }
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

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  "graphql_public": {
          Enums: {
            
          }
        },"public": {
          Enums: {
            
          }
        }
} as const
