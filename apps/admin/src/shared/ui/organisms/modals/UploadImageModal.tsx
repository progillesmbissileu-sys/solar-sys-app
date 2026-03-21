import { Button } from '../../atoms/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../atoms/Dialog';
import { FormWrapper } from '../form/FormWrapper';
import * as Field from '../form/Field';
import { SubmitButton } from '../form/Component';

export const UploadImageModal = (props: {
  open: boolean;
  onConfirm: any;
  onOpenChange: (open: boolean) => void;
  loading?: boolean;
}) => {
  return (
    <>
      <Dialog open={props.open} onOpenChange={props.onOpenChange}>
        <DialogContent className="overflow-hidden bg-gray-100 p-4 md:max-w-sm">
          <DialogHeader className="h-fit">
            <DialogTitle className="hidden"></DialogTitle>
          </DialogHeader>

          <div className="pt-9">
            <FormWrapper serverAction={props.onConfirm} formOptions={{ defaultValues: {} }}>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-full">
                  <Field.ImageUploadInput name="file" multiple={false} />
                </div>

                <div className="col-span-full md:col-span-1">
                  <Field.Text name="alt" placeholder="common.alt" />
                </div>
                <div className="col-span-full md:col-span-1">
                  <Field.Text name="title" placeholder="common.title" />
                </div>
                <div className="col-span-full">
                  <Field.Select
                    name="isMainImage"
                    placeholder="Type (secondaire - principal)"
                    defaultValue="false"
                    options={[
                      { label: 'Image secondaire', value: 'false' },
                      { label: 'Image principale', value: 'true' },
                    ]}
                  />
                </div>
                <div className="col-span-full md:col-span-1">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => props.onOpenChange(false)}
                  >
                    Annuler
                  </Button>
                </div>
                <div className="col-span-full md:col-span-1">
                  <SubmitButton label="Confirmer" className="h-10" />
                </div>
              </div>
            </FormWrapper>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
