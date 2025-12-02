export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type DesignStatus =
  | "draft"
  | "generating"
  | "qa_review"
  | "pending_approval"
  | "approved"
  | "rejected"
  | "deposit_paid"
  | "in_production"
  | "completed";

export type ShotType =
  | "packshot_front"
  | "hero_angle"
  | "macro_detail"
  | "on_model_closeup"
  | "on_model_lifestyle";

export type OrderStatus =
  | "deposit_pending"
  | "deposit_paid"
  | "in_production"
  | "quality_check"
  | "shipped"
  | "delivered";

export type ProductionStage =
  | "design_approved"
  | "materials_sourced"
  | "wax_model"
  | "casting"
  | "stone_setting"
  | "polishing"
  | "final_qa"
  | "ready_to_ship";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          updated_at?: string;
        };
      };
      celebrity_collections: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          image_url: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description: string;
          image_url: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string;
          image_url?: string;
          is_active?: boolean;
        };
      };
      designs: {
        Row: {
          id: string;
          user_id: string;
          status: DesignStatus;
          // User input data
          intent: string;
          category: string;
          metal: string;
          karat: string;
          style_tags: string[];
          price_band: string;
          stone_config: Json;
          size_fit: Json;
          user_vision: string;
          // AI generated data
          design_spec: Json;
          original_spec: Json;
          user_facing_description: string | null;
          ai_adjustments_explanation: string | null;
          qa_score: number | null;
          qa_notes: string | null;
          // Admin data
          final_price: number | null;
          lead_time_days: number | null;
          jeweler_notes: string | null;
          approved_by: string | null;
          approved_at: string | null;
          rejected_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          status?: DesignStatus;
          intent: string;
          category: string;
          metal: string;
          karat: string;
          style_tags: string[];
          price_band: string;
          stone_config: Json;
          size_fit: Json;
          user_vision: string;
          design_spec?: Json;
          original_spec?: Json;
          user_facing_description?: string | null;
          ai_adjustments_explanation?: string | null;
          qa_score?: number | null;
          qa_notes?: string | null;
          final_price?: number | null;
          lead_time_days?: number | null;
          jeweler_notes?: string | null;
          approved_by?: string | null;
          approved_at?: string | null;
          rejected_reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: DesignStatus;
          design_spec?: Json;
          original_spec?: Json;
          user_facing_description?: string | null;
          ai_adjustments_explanation?: string | null;
          qa_score?: number | null;
          qa_notes?: string | null;
          final_price?: number | null;
          lead_time_days?: number | null;
          jeweler_notes?: string | null;
          approved_by?: string | null;
          approved_at?: string | null;
          rejected_reason?: string | null;
          updated_at?: string;
        };
      };
      design_images: {
        Row: {
          id: string;
          design_id: string;
          shot_type: ShotType;
          image_url: string;
          storage_path: string;
          prompt: string;
          user_facing_description: string;
          vision_qa_score: number | null;
          vision_qa_notes: string | null;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          design_id: string;
          shot_type: ShotType;
          image_url: string;
          storage_path: string;
          prompt: string;
          user_facing_description: string;
          vision_qa_score?: number | null;
          vision_qa_notes?: string | null;
          order: number;
          created_at?: string;
        };
        Update: {
          vision_qa_score?: number | null;
          vision_qa_notes?: string | null;
        };
      };
      orders: {
        Row: {
          id: string;
          design_id: string;
          user_id: string;
          status: OrderStatus;
          deposit_amount: number;
          final_amount: number;
          stripe_deposit_session_id: string | null;
          stripe_deposit_payment_id: string | null;
          stripe_final_session_id: string | null;
          stripe_final_payment_id: string | null;
          deposit_paid_at: string | null;
          final_paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          design_id: string;
          user_id: string;
          status?: OrderStatus;
          deposit_amount: number;
          final_amount: number;
          stripe_deposit_session_id?: string | null;
          stripe_deposit_payment_id?: string | null;
          stripe_final_session_id?: string | null;
          stripe_final_payment_id?: string | null;
          deposit_paid_at?: string | null;
          final_paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: OrderStatus;
          stripe_deposit_payment_id?: string | null;
          stripe_final_session_id?: string | null;
          stripe_final_payment_id?: string | null;
          deposit_paid_at?: string | null;
          final_paid_at?: string | null;
          updated_at?: string;
        };
      };
      production_stages: {
        Row: {
          id: string;
          order_id: string;
          stage: ProductionStage;
          completed: boolean;
          notes: string | null;
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          stage: ProductionStage;
          completed?: boolean;
          notes?: string | null;
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          completed?: boolean;
          notes?: string | null;
          completed_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      design_status: DesignStatus;
      shot_type: ShotType;
      order_status: OrderStatus;
      production_stage: ProductionStage;
    };
  };
}
