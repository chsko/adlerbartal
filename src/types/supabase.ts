export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            comment: {
                Row: {
                    created_at: string
                    edited_at: string | null
                    id: number
                    recipe_ref: number
                    user_ref: string
                }
                Insert: {
                    created_at?: string
                    edited_at?: string | null
                    id?: number
                    recipe_ref: number
                    user_ref: string
                }
                Update: {
                    created_at?: string
                    edited_at?: string | null
                    id?: number
                    recipe_ref?: number
                    user_ref?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'comment_recipe_ref_fkey'
                        columns: ['recipe_ref']
                        isOneToOne: false
                        referencedRelation: 'recipe'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'comment_user_ref_fkey'
                        columns: ['user_ref']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            profile: {
                Row: {
                    first_name: string
                    id: string
                    last_name: string
                    middle_name: string | null
                }
                Insert: {
                    first_name: string
                    id: string
                    last_name: string
                    middle_name?: string | null
                }
                Update: {
                    first_name?: string
                    id?: string
                    last_name?: string
                    middle_name?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'profiles_id_fkey'
                        columns: ['id']
                        isOneToOne: true
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            recipe: {
                Row: {
                    content: string
                    created_at: string
                    duration: number
                    id: number
                    image: string | null
                    ingredients: Json
                    price: number
                    title: string
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    content: string
                    created_at?: string
                    duration: number
                    id?: number
                    image?: string | null
                    ingredients?: Json
                    price: number
                    title?: string
                    updated_at?: string | null
                    user_id: string
                }
                Update: {
                    content?: string
                    created_at?: string
                    duration?: number
                    id?: number
                    image?: string | null
                    ingredients?: Json
                    price?: number
                    title?: string
                    updated_at?: string | null
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'recipe_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'profile'
                        referencedColumns: ['id']
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            get_unique_types:
                | {
                      Args: {
                          table_name: string
                          column_name: string
                      }
                      Returns: string[]
                  }
                | {
                      Args: {
                          table_name: string
                          column_name: string
                          field_name: string
                      }
                      Returns: string[]
                  }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database
    }
        ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
              Database[PublicTableNameOrOptions['schema']]['Views'])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
          Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
            PublicSchema['Views'])
      ? (PublicSchema['Tables'] &
            PublicSchema['Views'])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
          ? R
          : never
      : never

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof PublicSchema['Tables']
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database
    }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Insert: infer I
        }
          ? I
          : never
      : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof PublicSchema['Tables']
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database
    }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Update: infer U
        }
          ? U
          : never
      : never

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof PublicSchema['Enums']
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
      ? PublicSchema['Enums'][PublicEnumNameOrOptions]
      : never
