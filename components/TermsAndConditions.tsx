"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";

const TermsAndConditions = ({ open, onOpenChange }: any) => {
  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(false)}>
      <DialogContent className="max-w-5xl flex flex-col md:justify-center md:items-center md:p-8 h-full md:h-auto overflow-auto">
        <DialogHeader className="text-2xl font-semibold">
          Términos de Uso para el Sitio Web Califica tu Profe
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-2">
          <span>
            Bienvenido al sitio web Califica tu Profe. Antes de utilizar este
            Sitio, le recomendamos que lea detenidamente estos Términos de Uso
            para comprender las condiciones que rigen su acceso y uso del Sitio.
            Al acceder o utilizar el Sitio, usted acepta estar sujeto a estos
            Términos. Si no está de acuerdo con alguno de los términos, por
            favor, no utilice el Sitio.
          </span>
          <span className="font-semibold">1. Descripción del Servicio</span>
          Califica tu Profe proporciona a los estudiantes la plataforma para
          dejar reseñas anónimas sobre profesores de universidades en Ecuador.
          Las reseñas son generadas por los usuarios y no representan
          necesariamente la opinión del Sitio.
          <span className="font-semibold">2. Uso Responsable</span>Al utilizar
          el Sitio, usted acepta utilizarlo de manera responsable y de
          conformidad con todas las leyes y regulaciones aplicables en Ecuador.
          No se permite el uso del Sitio para actividades ilegales o que violen
          los derechos de terceros.
          <span className="font-semibold">3. Anonimato y Privacidad</span>
          Califica tu Profe; permite reseñas anónimas para proteger la identidad
          de los usuarios. Sin embargo, el Sitio puede divulgar información de
          acuerdo con las leyes ecuatorianas o cuando sea necesario para
          proteger sus derechos o la seguridad de otros usuarios.
          <span className="font-semibold">4. Reglas de Conducta</span>
          a. No se tolerará la publicación de contenido difamatorio, ofensivo,
          obsceno o ilegal. b. Se prohíbe el acoso, la intimidación o cualquier
          forma de comportamiento abusivo hacia otros usuarios. c. Los usuarios
          deben respetar la privacidad de terceros y abstenerse de compartir
          información personal sin consentimiento.
          <span className="font-semibold">5. Contenido de los Usuarios</span>
          Los usuarios son responsables del contenido de sus reseñas. Califica
          tu Profe se reserva el derecho de eliminar o modificar cualquier
          contenido que viole estos Términos o que se considere inapropiado.
          <span className="font-semibold">6. Propiedad Intelectual</span>
          Todo el contenido de Califica tu Profe, incluyendo, pero no limitado a
          texto, gráficos, logotipos, imágenes y software, está protegido por
          derechos de autor y otras leyes de propiedad intelectual en Ecuador.
          Los usuarios no pueden copiar, reproducir, distribuir o crear trabajos
          derivados sin el consentimiento expreso del Sitio.
          <span className="font-semibold">
            7. Limitación de Responsabilidad
          </span>
          Califica tu Profe no se hace responsable de la exactitud, integridad o
          legalidad del contenido de las reseñas. Los usuarios utilizan el Sitio
          bajo su propio riesgo. El Sitio no será responsable por daños
          directos, indirectos, incidentales, especiales o consecuentes
          resultantes del uso o la imposibilidad de usar el Sitio.
          <span className="font-semibold">
            8. Modificaciones de los Términos
          </span>
          Califica tu Profe se reserva el derecho de modificar estos Términos en
          cualquier momento. Las modificaciones serán efectivas inmediatamente
          después de la publicación de los Términos actualizados en el Sitio. Es
          responsabilidad del usuario revisar periódicamente estos Términos.
          <span className="font-semibold">9. Ley Aplicable y Jurisdicción</span>
          Estos Términos se rigen por las leyes de la República del Ecuador.
          Cualquier disputa relacionada con estos Términos estará sujeta a la
          jurisdicción exclusiva de los tribunales competentes en Ecuador. Al
          utilizar Califica tu Profe, usted acepta estos Términos de Uso. Si
          tiene alguna pregunta o inquietud, contáctenos en lyonel@live.com
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditions;
