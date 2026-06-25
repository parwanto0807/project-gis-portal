'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import api from '@/lib/axios';
import { toast } from 'sonner';

interface EditUserDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSuccess: () => void;
}

export default function EditUserDetailsDialog({ isOpen, onClose, user, onSuccess }: EditUserDetailsDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        password: '', // Don't populate password for security
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      const payload: any = {};
      if (formData.username && formData.username !== user.username) {
        payload.username = formData.username;
      }
      if (formData.password) {
        payload.password = formData.password;
      }

      if (Object.keys(payload).length === 0) {
        toast.info('No changes made.');
        onClose();
        return;
      }

      const res = await api.put(`/users/${user.id}`, payload);
      
      if (res.data.success) {
        toast.success(res.data.message || 'User details updated successfully');
        onSuccess();
        onClose();
      } else {
        toast.error(res.data.message || 'Failed to update user');
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred while updating user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit User Details</DialogTitle>
            <DialogDescription>
              Update the username or reset the password for {user?.email}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="col-span-3"
                placeholder="Optional username"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                New Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="col-span-3"
                placeholder="Leave blank to keep unchanged"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
