import { useContext, useEffect, useState } from "react";
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
import { getAllCategories } from "@/api/categories"; 
import { createProject } from "@/api/project";
import { toast } from "sonner";

export default function AddProject() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [duration, setDuration] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [budget, setBudget] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const { user } = useContext(UserContext) || {};

  useEffect(() => {
     async function fetchCategories() {
       try {
         const data = await getAllCategories();
         setCategories(data);
       } catch (error) {
         console.error("Error fetching categories:", error);
       }
     }
     fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectPayload = {
      name,
      description,
      skills,
      duration: Number(duration),
      categoryId,
      ownerId: user?.sub,
      budget: Number(budget),
    };

    try {
      await createProject(projectPayload);
      toast("تم إنشاء المشروع بنجاح!");
      setOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-lamagreen text-slate-100">
          إضافة مشروع
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-right">
        <DialogHeader>
          <DialogTitle className="text-lamagreen">إضافة مشروع</DialogTitle>
          <DialogDescription>
            أدخل المعلومات المطلوبة لإضافة مشروع جديد
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* عنوان المشروع */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                عنوان المشروع
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="أدخل عنوان المشروع"
              />
            </div>
            {/* وصف المشروع */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                وصف المشروع
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                placeholder="أدخل وصف المشروع"
              />
            </div>
            {/* المهارات */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                المهارات
              </Label>
              <Input
                id="skills"
                value={skills.join(", ")}
                onChange={(e) =>
                  setSkills(
                    e.target.value
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter((skill) => skill !== "")
                  )
                }
                className="col-span-3"
                placeholder="أدخل المهارات مفصولة بفاصلة (مثلاً: React, Node.js)"
              />
            </div>
            {/* تاريخ الانتهاء */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                الموعد انجاز المشروع
              </Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="col-span-3"
                placeholder="مثلا: 30 يوم"
              />
            </div>
            {/* اختيار الفئة */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoryId" className="text-right">
                الفئة
              </Label>
              <select
                id="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="col-span-3 p-2 border rounded"
              >
                <option value="">اختر الفئة</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {/* الميزانية */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="budget" className="text-right">
                الميزانية
              </Label>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="col-span-3"
                placeholder="أدخل الميزانية"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-lamagreen">
              إضافة
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
