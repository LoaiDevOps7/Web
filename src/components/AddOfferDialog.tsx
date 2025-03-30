import { createBid } from "@/api/bids";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/context/UserContext";
import { useContext, useState } from "react";

interface AddOfferDialogProps {
  projectId: string;
  ownerId: number;
}

export default function AddOfferDialog({
  projectId,
  ownerId,
}: AddOfferDialogProps) {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext) || {};
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bidData = {
      amount: Number(amount),
      description,
      submittedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      deliveryTime: Number(deliveryTime),
      projectId,
      freelancerId: user?.sub,
      ownerId,
      status: "pending",
    };

    try {
      await createBid(bidData);
      setOpen(false);
    } catch (error) {
      console.error("Error creating bid", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-lamathirthblue text-slate-100">
          أضف عرضك
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-right">
        <DialogHeader>
          <DialogTitle className="text-lamagreen text-center">
            إضافة عرض
          </DialogTitle>
          <DialogDescription className="text-red-500 my-3 text-sm text-center">
            احرص على أن يكون عرضك جذابًا وجميلًا لرفع نسبة قبولك من صاحب المشروع
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3 text-right" />
                <Label
                  htmlFor="description"
                  className="text-right text-slate-600"
                >
                  رسالة العرض
                </Label>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="col-span-3 text-right" />
                <Label htmlFor="amount" className="text-right text-slate-600">
                  التكلفة المطلوبة
                </Label>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="deliveryTime"
                  type="number"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="col-span-3 text-right" />
                <Label
                  htmlFor="deliveryTime"
                  className="text-right text-slate-600"
                >
                  مدة التسليم بالأيام
                </Label>
              </div>
            </div><DialogFooter>
                <Button
                  type="submit"
                  className="bg-lamagreen w-[50%] rounded-md text-center mx-auto"
                >
                  إضافة
                </Button>
              </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
