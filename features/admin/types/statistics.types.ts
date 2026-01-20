export interface SubscriptionPlanStats {
  count: number;
  planName: string;
}

export interface Statistics {
  totalUsers: number;
  totalSubscribedUsers: number;
  subscribedUsersPercentage: number;
  subscribedPlans: SubscriptionPlanStats[];
}
