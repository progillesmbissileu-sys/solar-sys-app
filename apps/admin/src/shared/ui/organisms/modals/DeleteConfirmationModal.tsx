import { Trash2Icon } from 'lucide-react';
import { Button } from '../../atoms/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../atoms/Dialog';

export const DeleteConfirmationModal = (props: {
  open: boolean;
  content: React.ReactNode;
  onConfirm: any;
  onOpenChange: (open: boolean) => void;
  loading?: boolean;
}) => {
  return (
    <>
      <Dialog open={props.open} onOpenChange={props.onOpenChange}>
        <DialogContent className="flex flex-col gap-12 overflow-hidden bg-gray-100 p-5 md:max-w-sm">
          <DialogHeader className="h-fit">
            <DialogTitle className="hidden"></DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center gap-y-6">
            <div className="rounded-lg border bg-white p-6">
              <Trash2Icon className="h-8 w-8 text-red-500" />
            </div>
            <div>{props.content}</div>
          </div>

          <DialogFooter className="border-t border-dashed border-gray-200">
            <div className="flex w-full gap-x-3">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => props.onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={props.onConfirm}
                isLoading={props.loading}
              >
                Confirmer
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
