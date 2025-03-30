"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTimeAgo } from "@/utils/time";
import { useNotifications } from "@/context/NotificationContext";

type CardProps = React.ComponentProps<typeof Card>;

export default function UserNotifications({ className, ...props }: CardProps) {
  const { privateNotifications, markAsRead, clearNotifications } =
    useNotifications();

  return (
    <Card
      className={cn("w-full border-none shadow-none", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-lamagreen">الإشعارات الحصرية</CardTitle>
        <CardDescription>
          لديك {privateNotifications.filter((n) => !n.read).length} إشعارات
          جديدة
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {privateNotifications.map((notification, index) => (
            <div
              key={index}
              className={cn(
                "mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0",
                notification.read ? "opacity-50" : ""
              )}
              onClick={() => markAsRead("private", index)}
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-lamagreen" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                  {!notification.read && (
                    <span className="ml-2 text-xs text-lamagreen">جديد</span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
                <span className="text-xs text-gray-500">
                  {getTimeAgo(new Date(notification.createdAt))}
                </span>
              </div>
            </div>
          ))}
          {privateNotifications.length > 0 && (
            <Button
              disabled={privateNotifications.length === 0}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600"
              onClick={() => clearNotifications("private")}
            >
              مسح الكل
              <Trash2 className="mr-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
