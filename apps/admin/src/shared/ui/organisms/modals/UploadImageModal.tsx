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
        <DialogContent className="flex h-[50vh] flex-col gap-12 overflow-hidden bg-gray-100 p-5 md:max-w-sm">
          <DialogHeader className="h-fit">
            <DialogTitle className="hidden"></DialogTitle>
          </DialogHeader>

          <div>
            <FormWrapper serverAction={props.onConfirm} formOptions={{ defaultValues: {} }}>
              <div>
                <Field.ImageUploadInput name="file" multiple={false} />
              </div>
              {/*<div>
                <Field.Select
                  name="isMainImage"
                  options={[
                    { label: 'Image secondaire', value: 'false' },
                    { label: 'Image principale', value: 'true' },
                  ]}
                />
              </div>*/}
              {/*<div>
                <Field.Text name="alt" />
              </div>
              <div>
                <Field.Text name="title" />
              </div>
              <div className="flex w-full gap-x-3">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => props.onOpenChange(false)}
                >
                  Annuler
                </Button>
                <SubmitButton label="Confirmer" />
              </div>*/}
            </FormWrapper>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
