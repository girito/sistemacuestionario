# -*- coding: utf-8 -*-

from django.shortcuts import render, redirect
from django.http import HttpResponseBadRequest, HttpResponse
from django.core.urlresolvers import reverse
from django.http.response import HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth.decorators import permission_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from registro.models import Cuestionario, PuntajeTrastorno, BRMF
from django import forms
from import_export import resources
from tablib import Dataset

class CuestionarioResource(resources.ModelResource):
    class Meta:
        model = Cuestionario

@permission_required("is_superuser")
def import_data(request):
    if request.method == 'POST':
        cuestionario_resource = CuestionarioResource()
        dataset = Dataset()
        new_cuestionarios = request.FILES['myfile']

        imported_data = dataset.load(new_cuestionarios.read())
        result = cuestionario_resource.import_data(dataset, dry_run=True)

        if not result.has_errors():
            cuestionario_resource.import_data(dataset, dry_run=False)

    return render(request,'procesos/upload_form.html',{'title': 'Importar datos','header': 'Archivo que desea importar'})


def resultados_1(request):
    #listas Factor X y X1/2
    fcx=[145,150,160,170,180,190,200,210,220,230,240,250,401,417,433,449,465,481,497,513,529,545,561,577,591]
    X12a=[5,5,4,4,3,3,2,2,1,1,0,0,0,-1,-1,-2,-2,-3,-3,-4,-4,-5,-5,-6]
    objs_list = Cuestionario.objects.all()
    for cuest in objs_list:
        if len(PuntajeTrastorno.objects.filter(registro=cuest)) <10:
            #Puntaje Bruto
            d_social=cuest.p4+cuest.p13+cuest.p32+cuest.p37+cuest.p56+cuest.p57+cuest.p69+cuest.p72+cuest.p80+cuest.p82+cuest.p83+cuest.p95+cuest.p97+cuest.p114+cuest.p115+cuest.p125+cuest.p126+cuest.p137+cuest.p139+cuest.p145+cuest.p152
            autodescalif=cuest.p3+cuest.p5+cuest.p8+cuest.p16+cuest.p21+cuest.p22+cuest.p23+cuest.p24+cuest.p25+cuest.p31+cuest.p34+cuest.p41+cuest.p43+cuest.p47+cuest.p48+cuest.p49+cuest.p50+cuest.p51+cuest.p55+cuest.p58+cuest.p61+cuest.p62+cuest.p63+cuest.p65+cuest.p66+cuest.p70+cuest.p73+cuest.p76+cuest.p88+cuest.p89+cuest.p91+cuest.p92+cuest.p94+cuest.p99+cuest.p101+cuest.p105+cuest.p106+cuest.p108+cuest.p109+cuest.p110+cuest.p117+cuest.p120+cuest.p124+cuest.p144+cuest.p153
            esquizoide=cuest.p2*3+cuest.p10*2+cuest.p12*3+cuest.p15+cuest.p17*3+cuest.p20+cuest.p23+cuest.p31*2+cuest.p32*3+cuest.p44+cuest.p45*2+cuest.p50+cuest.p75*3+cuest.p77*2+cuest.p79+cuest.p97*2+cuest.p99+cuest.p113*2+cuest.p129+cuest.p130+cuest.p131*3+cuest.p138*2+cuest.p145+cuest.p146+cuest.p147*3
            evitativo=cuest.p2+cuest.p3*3+cuest.p8*3+cuest.p17*2+cuest.p21*2+cuest.p23*2+cuest.p25*2+cuest.p30*2+cuest.p32+cuest.p43+cuest.p45*2+cuest.p47*3+cuest.p53*2+cuest.p54*2+cuest.p58*3+cuest.p71*3+cuest.p75+cuest.p77*2+cuest.p79+cuest.p94*2+cuest.p97+cuest.p100+cuest.p101*2+cuest.p104+cuest.p106*2+cuest.p109*2+cuest.p110*3+cuest.p121+cuest.p127+cuest.p129*3+cuest.p135+cuest.p138*2+cuest.p141*2+cuest.p144*3+cuest.p146+cuest.p156*2
            dependiente=cuest.p10*3+cuest.p29*3+cuest.p32*2+cuest.p40*3+cuest.p47+cuest.p51+cuest.p54*2+cuest.p56*2+cuest.p69+cuest.p71*2+cuest.p72*3+cuest.p75*2+cuest.p89*2+cuest.p97*3+cuest.p101+cuest.p114+cuest.p121*3+cuest.p133*3+cuest.p137+cuest.p145*3+cuest.p154+cuest.p158*3
            histrionico=cuest.p7+cuest.p9*2+cuest.p13*3+cuest.p18*3+cuest.p26*3+cuest.p35+cuest.p38+cuest.p39+cuest.p40*2+cuest.p41*2+cuest.p46*3+cuest.p53+cuest.p56*3+cuest.p61*2+cuest.p80*3+cuest.p83+cuest.p84+cuest.p87+cuest.p95*2+cuest.p102*3+cuest.p114*3+cuest.p117+cuest.p121*2+cuest.p125*3+cuest.p130+cuest.p148+cuest.p152*2+cuest.p155*3+cuest.p156+cuest.p157+cuest.p158
            narcisista =cuest.p1*3+cuest.p2+cuest.p4*2+cuest.p6*3+cuest.p11+cuest.p13*2+cuest.p14*3+cuest.p15*2+cuest.p20+cuest.p26+cuest.p30+cuest.p35*3+cuest.p39*2+cuest.p41+cuest.p52+cuest.p56+cuest.p74+cuest.p79+cuest.p80*2+cuest.p83*3+cuest.p84*3+cuest.p95*2+cuest.p102*2+cuest.p114*2+cuest.p115+cuest.p118*3+cuest.p119*3+cuest.p122+cuest.p123+cuest.p125*2+cuest.p130*3+cuest.p131+cuest.p134+cuest.p149+cuest.p151*2+cuest.p152*3+cuest.p155*2+cuest.p156*2+cuest.p157*2
            antisocial=cuest.p1*2+cuest.p7*3+cuest.p11*2+cuest.p14+cuest.p18*2+cuest.p20*2+cuest.p30*2+cuest.p36*2+cuest.p38*3+cuest.p41*2+cuest.p42+cuest.p46+cuest.p52*2+cuest.p59+cuest.p67*2+cuest.p68*2+cuest.p74*2+cuest.p79+cuest.p80*2+cuest.p81*2+cuest.p84*2+cuest.p85*3+cuest.p86*3+cuest.p93+cuest.p95*3+cuest.p96+cuest.p102+cuest.p104+cuest.p107*3+cuest.p118*2+cuest.p128+cuest.p130*2+cuest.p132*2+cuest.p135*3+cuest.p143+cuest.p148*3+cuest.p151*2+cuest.p156+cuest.p157*3
            agresivo_sadico=cuest.p1*2+cuest.p4*3+cuest.p7+cuest.p9*3+cuest.p11*3+cuest.p19*2+cuest.p28*3+cuest.p30+cuest.p36+cuest.p38+cuest.p39*3+cuest.p41+cuest.p42*3+cuest.p55+cuest.p59*2+cuest.p61+cuest.p68*2+cuest.p74+cuest.p76*2+cuest.p78*2+cuest.p80+cuest.p84*2+cuest.p87+cuest.p93*3+cuest.p98*2+cuest.p106*2+cuest.p111*2+cuest.p118*2+cuest.p122*3+cuest.p123+cuest.p130+cuest.p134+cuest.p135+cuest.p136*3+cuest.p141*2+cuest.p149*3+cuest.p151+cuest.p152*2
            compulsivo=cuest.p4+cuest.p19*3+cuest.p30+cuest.p37*3+cuest.p44*3+cuest.p57*3+cuest.p59*2+cuest.p68+cuest.p69*3+cuest.p72+cuest.p75+cuest.p82*3+cuest.p115*3+cuest.p122*2+cuest.p126*3+cuest.p136*2+cuest.p137*3+cuest.p139*3+cuest.p145*2+cuest.p147*2+cuest.p149*2
            pasivo_agresivo=cuest.p1+cuest.p4+cuest.p9*2+cuest.p11+cuest.p15*2+cuest.p19+cuest.p20*3+cuest.p21+cuest.p23+cuest.p26*2+cuest.p41*2+cuest.p48*3+cuest.p49+cuest.p52*3+cuest.p55+cuest.p59*2+cuest.p61*3+cuest.p67*2+cuest.p68*2+cuest.p71*2+cuest.p76*2+cuest.p80*2+cuest.p87*3+cuest.p93*2+cuest.p96*3+cuest.p98*3+cuest.p101+cuest.p106*2+cuest.p110+cuest.p112*2+cuest.p117*2+cuest.p118+cuest.p123*3+cuest.p127+cuest.p141*2+cuest.p142*3+cuest.p151*3+cuest.p156
            autoderrotista=cuest.p8+cuest.p10*2+cuest.p15*2+cuest.p16+cuest.p21*3+cuest.p23+cuest.p26*2+cuest.p29+cuest.p40*2+cuest.p43*2+cuest.p49*2+cuest.p51*2+cuest.p53*2+cuest.p54*3+cuest.p58+cuest.p60*3+cuest.p65+cuest.p67+cuest.p71*2+cuest.p75+cuest.p76+cuest.p91+cuest.p97*2+cuest.p101*3+cuest.p106*2+cuest.p110*2+cuest.p111*3+cuest.p117+cuest.p120*2+cuest.p121+cuest.p127*3+cuest.p129+cuest.p133*2+cuest.p140*3+cuest.p141*2+cuest.p153+cuest.p154*3+cuest.p156+cuest.p158
            esquizotipico=cuest.p2*2+cuest.p3*2+cuest.p8*2+cuest.p10+cuest.p12+cuest.p17+cuest.p21+cuest.p22*3+cuest.p23+cuest.p29*2+cuest.p36*2+cuest.p45*3+cuest.p47*2+cuest.p50+cuest.p58*2+cuest.p64*3+cuest.p71*2+cuest.p77*3+cuest.p79*2+cuest.p92*2+cuest.p94*3+cuest.p99+cuest.p103*3+cuest.p104*2+cuest.p109*3+cuest.p110*2+cuest.p112*2+cuest.p113*2+cuest.p121*2+cuest.p124+cuest.p129*2+cuest.p135+cuest.p138*3+cuest.p144*2+cuest.p146+cuest.p147+cuest.p148+cuest.p150*2+cuest.p151
            borderline=cuest.p5*2+cuest.p7+cuest.p20*2+cuest.p21*2+cuest.p23*3+cuest.p24*2+cuest.p25*2+cuest.p33*2+cuest.p34+cuest.p38+cuest.p41*3+cuest.p42+cuest.p48*2+cuest.p49+cuest.p50+cuest.p51+cuest.p53*3+cuest.p54+cuest.p55*3+cuest.p60+cuest.p61*2+cuest.p62+cuest.p66+cuest.p67*3+cuest.p68+cuest.p71+cuest.p72+cuest.p73*2+cuest.p76*3+cuest.p84*2+cuest.p86+cuest.p87*2+cuest.p89*2+cuest.p91+cuest.p93*2+cuest.p95+cuest.p96+cuest.p99+cuest.p101+cuest.p104*3+cuest.p106*3+cuest.p117*3+cuest.p118*2+cuest.p120+cuest.p123+cuest.p124*2+cuest.p127+cuest.p128*2+cuest.p130*2+cuest.p132+cuest.p135+cuest.p140+cuest.p141*3+cuest.p142*2+cuest.p148+cuest.p151+cuest.p153+cuest.p154+cuest.p156*3+cuest.p158
            paranoide=cuest.p6+cuest.p11+cuest.p14*2+cuest.p15*3+cuest.p19+cuest.p20+cuest.p22*2+cuest.p28+cuest.p30*3+cuest.p35*2+cuest.p36*3+cuest.p37+cuest.p39+cuest.p41+cuest.p42+cuest.p44*2+cuest.p52+cuest.p57+cuest.p58+cuest.p59*3+cuest.p63+cuest.p68*3+cuest.p69+cuest.p74*2+cuest.p78*3+cuest.p79*3+cuest.p83*2+cuest.p90+cuest.p92*2+cuest.p95*2+cuest.p112*2+cuest.p115*2+cuest.p116*1+cuest.p118*2+cuest.p119*2+cuest.p123+cuest.p126+cuest.p131+cuest.p134*3+cuest.p149+cuest.p150*3+cuest.p151+cuest.p156+cuest.p157
            ansiedad=cuest.p8+cuest.p15+cuest.p16*3+cuest.p24+cuest.p27*2+cuest.p31*2+cuest.p34+cuest.p49*3+cuest.p50*2+cuest.p51+cuest.p62*3+cuest.p65*2+cuest.p72+cuest.p88*2+cuest.p89*2+cuest.p91+cuest.p99+cuest.p100*2+cuest.p105*3+cuest.p108*3+cuest.p120+cuest.p133+cuest.p139+cuest.p153*2
            distimia=cuest.p5*2+cuest.p8*2+cuest.p23+cuest.p24*2+cuest.p25*3+cuest.p34*2+cuest.p43*3+cuest.p44+cuest.p49*2+cuest.p50*2+cuest.p51*3+cuest.p53+cuest.p60*2+cuest.p65*2+cuest.p66*2+cuest.p70*2+cuest.p73*3+cuest.p77*2+cuest.p88*2+cuest.p89*3+cuest.p91*3+cuest.p98+cuest.p99*3+cuest.p100*2+cuest.p101+cuest.p120*3+cuest.p124*2+cuest.p127+cuest.p140*2+cuest.p141+cuest.p153+cuest.p154
            if cuest.p3==0:
                histrionico=histrionico+1
            if cuest.p4==0:
                dependiente=dependiente+2
            if cuest.p7==0:
                dependiente=dependiente+1
                compulsivo=compulsivo+1
            if cuest.p8==0:
                narcisista=narcisista+1
            if cuest.p11==0:
                dependiente=dependiente+1
            if cuest.p13==0:
                esquizoide=esquizoide+1
                evitativo=evitativo+1
                esquizotipico=esquizotipico+1
            if cuest.p17==0:
                histrionico=histrionico+1
            if cuest.p18==0:
                esquizoide=esquizoide+2
                compulsivo=compulsivo+2
            if cuest.p19==0:
                evitativo=evitativo+1
                dependiente=dependiente+1
            if cuest.p26==0:
                esquizoide=esquizoide+1
                evitativo=evitativo+1
                dependiente=dependiente+1
            if cuest.p29==0:
                narcisista=narcisista+1
                agresivo_sadico=agresivo_sadico+1
            if cuest.p32==0:
                antisocial=antisocial+1
            if cuest.p37==0:
                histrionico=histrionico+1
            if cuest.p38==0:
                dependiente=dependiente+1
                compulsivo=compulsivo+1
            if cuest.p39==0:
                dependiente=dependiente+1
                distimia=distimia+1
            if cuest.p40==0:
                narcisista=narcisista+2
                antisocial=antisocial+2
                agresivo_sadico=agresivo_sadico+2
            if cuest.p41==0:
                dependiente=dependiente+1
                compulsivo=compulsivo+1
            if cuest.p43==0:
                narcisista=narcisista+1
            if cuest.p46==0:
                esquizoide=esquizoide+2
                compulsivo=compulsivo+2
                esquizotipico=esquizotipico+1
            if cuest.p48==0:
                compulsivo=compulsivo+1
            if cuest.p49==0:
                histrionico=histrionico+1
                narcisista=narcisista+1
            if cuest.p56==0:
                esquizoide=esquizoide+1
                compulsivo=compulsivo+1
                esquizotipico=esquizotipico+1
            if cuest.p57==0:
                histrionico=histrionico+2
                pasivo_agresivo=pasivo_agresivo+1
            if cuest.p61==0:
                compulsivo=compulsivo+1
            if cuest.p65==0:
                agresivo_sadico=agresivo_sadico+1
            if cuest.p68==0:
                dependiente=dependiente+1
                autoderrotista=autoderrotista+1
            if cuest.p71==0:
                histrionico=histrionico+1
                antisocial=antisocial+1
                agresivo_sadico=agresivo_sadico+2
                compulsivo=compulsivo+1
            if cuest.p72==0:
                esquizoide=esquizoide+1
                narcisista=narcisista+1
                antisocial=antisocial+2
                agresivo_sadico=agresivo_sadico+2
            if cuest.p75==0:
                antisocial=antisocial+2
            if cuest.p80==0:
                compulsivo=compulsivo+2
                distimia=distimia+1
            if cuest.p84==0:
                dependiente=dependiente+1
            if cuest.p85==0:
                dependiente=dependiente+1
                compulsivo=compulsivo+1
            if cuest.p87==0:
                esquizoide=esquizoide+1
                compulsivo=compulsivo+1
            if cuest.p93==0:
                dependiente=dependiente+1
            if cuest.p95==0:
                esquizoide=esquizoide+1
                compulsivo=compulsivo+1
            if cuest.p97==0:
                narcisista=narcisista+1
                agresivo_sadico=agresivo_sadico+1
            if cuest.p102==0:
                esquizoide=esquizoide+1
                compulsivo=compulsivo+1
            if cuest.p114==0:
                esquizoide=esquizoide+1
                evitativo=evitativo+1
            if cuest.p115==0:
                histrionico=histrionico+1
            if cuest.p117==0:
                compulsivo=compulsivo+1
            if cuest.p133==0:
                agresivo_sadico=agresivo_sadico+1
                compulsivo=compulsivo+2
            if cuest.p135==0:
                dependiente=dependiente+1
            if cuest.p137==0:
                narcisista=narcisista+2
                pasivo_agresivo=pasivo_agresivo+2
            if cuest.p141==0:
                compulsivo=compulsivo+1
            if cuest.p144==0:
                histrionico=histrionico+2
                narcisista=narcisista+2
            if cuest.p145==0:
                pasivo_agresivo=pasivo_agresivo+2
            if cuest.p148==0:
                dependiente=dependiente+1
            if cuest.p149==0:
                evitativo=evitativo+1
                dependiente=dependiente+1
            if cuest.p152==0:
                esquizotipico=esquizotipico+2
                ansiedad=ansiedad+1
                distimia=distimia+2

            #Puntaje BR
            brY=0
            brZ=0
            br1=0
            br2=0
            br3=0
            br4=0
            br5=0
            br6a=0
            br6b=0
            br7=0
            br8a=0
            br8b=0
            brS=0
            brC=0
            brP=0
            brA=0
            brD=0
            if cuest.sexo == 'M':
                for i in range(1,23):
                    if d_social==i:
                        brY=brY+BRMF.objects.get(pk=i+62).y
                for i in range(0,35):
                    if autodescalif==i:
                        brZ=brZ+BRMF.objects.get(pk=i+63).z
                for i in range(7,41):
                    if esquizoide==i:
                        br1=br1+BRMF.objects.get(pk=i+56).uno
                for i in range(0,47):
                    if evitativo==i:
                        br2=br2+BRMF.objects.get(pk=i+63).dos
                for i in range(17,52):
                    if dependiente==i:
                        br3=br3+BRMF.objects.get(pk=i+46).tres
                for i in range(0,59):
                    if histrionico==i:
                        br4=br4+BRMF.objects.get(pk=i+63).cuatro
                for i in range(16,68):
                    if narcisista==i:
                        br5=br5+BRMF.objects.get(pk=i+47).cinco
                for i in range(8,55):
                    if antisocial==i:
                        br6a=br6a+BRMF.objects.get(pk=i+55).seis_a
                for i in range(12,54):
                    if agresivo_sadico==i:
                        br6b=br6b+BRMF.objects.get(pk=i+51).seis_b
                for i in range(0,62):
                    if compulsivo==i:
                        br7=br7+BRMF.objects.get(pk=i+63).siete
                for i in range(7,56):
                    if pasivo_agresivo==i:
                        br8a=br8a+BRMF.objects.get(pk=i+56).ocho_a
                for i in range(3,44):
                    if autoderrotista==i:
                        br8b=br8b+BRMF.objects.get(pk=i+60).ocho_b
                for i in range(0,49):
                    if esquizotipico==i:
                        brS=brS+BRMF.objects.get(pk=i+63).s
                for i in range(5,65):
                    if borderline==i:
                        brC=brC+BRMF.objects.get(pk=i+58).c
                for i in range(6,63):
                    if paranoide==i:
                        brP=brP+BRMF.objects.get(pk=i+57).p
                for i in range(3,37):
                    if ansiedad==i:
                        brA=brA+BRMF.objects.get(pk=i+60).a
                for i in range(4,57):
                    if distimia==i:
                        brD=brD+BRMF.objects.get(pk=i+59).d
            else:
                for i in range(3,22):
                    if d_social==i:
                        brY=brY+BRMF.objects.get(pk=i-2).y
                for i in range(1,36):
                    if autodescalif==i:
                        brZ=brZ+BRMF.objects.get(pk=i).z
                for i in range(10,45):
                    if esquizoide==i:
                        br1=br1+BRMF.objects.get(pk=i-9).uno
                for i in range(5,52):
                    if evitativo==i:
                        br2=br2+BRMF.objects.get(pk=i-4).dos
                for i in range(18,54):
                    if dependiente==i:
                        br3=br3+BRMF.objects.get(pk=i-17).tres
                for i in range(11,53):
                    if histrionico==i:
                        br4=br4+BRMF.objects.get(pk=i-10).cuatro
                for i in range(16,58):
                    if narcisista==i:
                        br5=br5+BRMF.objects.get(pk=i-15).cinco
                for i in range(9,57):
                    if antisocial==i:
                        br6a=br6a+BRMF.objects.get(pk=i-8).seis_a
                for i in range(10,63):
                    if agresivo_sadico==i:
                        br6b=br6b+BRMF.objects.get(pk=i-9).seis_b
                for i in range(20,61):
                    if compulsivo==i:
                        br7=br7+BRMF.objects.get(pk=i-19).siete
                for i in range(9,54):
                    if pasivo_agresivo==i:
                        br8a=br8a+BRMF.objects.get(pk=i-8).ocho_a
                for i in range(3,49):
                    if autoderrotista==i:
                        br8b=br8b+BRMF.objects.get(pk=i-2).ocho_b
                for i in range(3,49):
                    if esquizotipico==i:
                        brS=brS+BRMF.objects.get(pk=i-2).s
                for i in range(4,66):
                    if borderline==i:
                        brC=brC+BRMF.objects.get(pk=i-3).c
                for i in range(0,60):
                    if paranoide==i:
                        brP=brP+BRMF.objects.get(pk=i+1).p
                for i in range(3,40):
                    if ansiedad==i:
                        brA=brA+BRMF.objects.get(pk=i-2).a
                for i in range(9,58):
                    if distimia==i:
                        brD=brD+BRMF.objects.get(pk=i-8).d

            #Factor X y X1/2
            sinceridad=(histrionico+pasivo_agresivo)*1.5+(esquizoide+evitativo+dependiente+autoderrotista)*1.6+(narcisista+antisocial+agresivo_sadico+compulsivo)
            X=0
            X12=0
            Xa=11
            if sinceridad>=145 and sinceridad<591:
                for i in range(1,25):
                    if sinceridad>=fcx[i-1] and sinceridad<fcx[i]:
                        X=X+Xa
                        X12=X12+X12a[i-1]
                    Xa=Xa-1
            #Factor X
            X1=br1+X
            X2=br2+X
            X3=br3+X
            X4=br4+X
            X5=br5+X
            X6a=br6a+X
            X6b=br6b+X
            X7=br7+X
            X8a=br8a+X
            X8b=br8b+X
            XA=brA+X
            XD=brD+X
            #Factor X1/2
            X2S=brS+X12
            X2C=brC+X12
            X2P=brP+X12

            #Ajustes DA
            DA=0
            DA2=0
            DAC=0
            DA8b=0
            if XD>=85:
                if XA<85:
                    DA=XD-85
                if XA>=85:
                    DA=DA+XD+XA-170
            if DA<16:
                DA2=int(X2-DA/float(4))
                DA8b=int(X8b-DA/float(4))
            else:
                DA2=0
                DA8b=0
            if DA<11:
                DAC=int(X2C-DA/float(2))
            else:
                DAC=0
            if DA2<=0:
                DA2=X2
            if DA8b<=0:
                DA8b=X8b
            if DAC<=0:
                DAC=X2C

            #Ajustes DD
            DD=int(round((brY-brZ)/float(10)))
            DDS=X2S+DD
            DDC=DAC+DD

            #Ajustes DC-1 y DC-2
            DC1=0
            i1=0
            DC2=0
            i2=0
            if cuest.sexo == 'M':
                if (X4>X1 and X4>=DA2 and X4>=X3 and X4>=X5 and X4>=X6a and X4>=X6b and X4>=X7 and X4>=X8a and X4>DA8b) or (X5>X1 and X5>=DA2 and X5>X3 and X5>X4 and X5>X6a and X5>X6b and X5>=X7 and X5>=X8a and X5>DA8b):
                    i1=1
                if X7>X1:
                    DC1=DC1+1
                if X7>=DA2:
                    DC1=DC1+1
                if X7>X3:
                    DC1=DC1+1
                if X7>X4:
                    DC1=DC1+1
                if X7>X5:
                    DC1=DC1+1
                if X7>X6a:
                    DC1=DC1+1
                if X7>X6b:
                    DC1=DC1+1
                if X7>=X8a:
                    DC1=DC1+1
                if X7>DA8b:
                    DC1=DC1+1
                if DA8b>=X1 and DA8b>=DA2 and DA8b>=X3 and DA8b>=X5 and DA8b>=X6a and DA8b>=X6b and DA8b>=X7 and DA8b>=X8a and DA8b>=DA8b:
                    i2=1
                if DA2>X1:
                    DC2=DC2+1
                if DA2>X3:
                    DC2=DC2+1
                if DA2>X4:
                    DC2=DC2+1
                if DA2>X5:
                    DC2=DC2+1
                if DA2>X6a:
                    DC2=DC2+1
                if DA2>X6b:
                    DC2=DC2+1
                if DA2>X7:
                    DC2=DC2+1
                if DA2>X8a:
                    DC2=DC2+1
                if DA2>DA8b:
                    DC2=DC2+1
            else:
                if (X4>X1 and X4>DA2 and X4>=X3 and X4>X5 and X4>X6a and X4>X6b and X4>X7 and X4>X8a and X4>DA8b) or (X5>X1 and X5>=DA2 and X5>=X3 and X5>=X4 and X5>X6a and X5>X6b and X5>=X7 and X5>=X8a and X5>=DA8b):
                    i1=1
                if X7>X1:
                    DC1=DC1+1
                if X7>DA2:
                    DC1=DC1+1
                if X7>=X3:
                    DC1=DC1+1
                if X7>=X4:
                    DC1=DC1+1
                if X7>X5:
                    DC1=DC1+1
                if X7>X6a:
                    DC1=DC1+1
                if X7>X6b:
                    DC1=DC1+1
                if X7>X8a:
                    DC1=DC1+1
                if X7>DA8b:
                    DC1=DC1+1
                if DA8b>X1 and DA8b>DA2 and DA8b>=X3 and DA8b>X5 and DA8b>X6a and DA8b>X6b and DA8b>X7 and DA8b>=X8a and DA8b>=DA8b:
                    i2=1
                if DA2>X1:
                    DC2=DC2+1
                if DA2>=X3:
                    DC2=DC2+1
                if DA2>=X4:
                    DC2=DC2+1
                if DA2>X5:
                    DC2=DC2+1
                if DA2>X6a:
                    DC2=DC2+1
                if DA2>X6b:
                    DC2=DC2+1
                if DA2>=X7:
                    DC2=DC2+1
                if DA2>=X8a:
                    DC2=DC2+1
                if DA2>=DA8b:
                    DC2=DC2+1
            if DC1>7 or i1==1:
                DC1S=DDS+4
                DC1C=DDC+4
                DC1P=X2P+2
            else:
                DC1S=DDS
                DC1C=DDC
                DC1P=X2P

            if DC2>7 or i2==1:
                DC2S=DC1S-2
                DC2C=DC1C-6
                DC2P=DC1P-7
            else:
                DC2S=DC1S
                DC2C=DC1C
                DC2P=DC1P

            puntajef1=PuntajeTrastorno()
            puntajef1.nombre_trastorno="Esquizoide"
            puntajef1.puntaje_trastorno=X1
            puntajef1.registro=cuest
            puntajef1.save()
            puntajef2=PuntajeTrastorno()
            puntajef2.nombre_trastorno="Evitativo"
            puntajef2.puntaje_trastorno=DA2
            puntajef2.registro=cuest
            puntajef2.save()
            puntajef3=PuntajeTrastorno()
            puntajef3.nombre_trastorno="Dependiente"
            puntajef3.puntaje_trastorno=X3
            puntajef3.registro=cuest
            puntajef3.save()
            puntajef4=PuntajeTrastorno()
            puntajef4.nombre_trastorno="Histriónico"
            puntajef4.puntaje_trastorno=X4
            puntajef4.registro=cuest
            puntajef4.save()
            puntajef5=PuntajeTrastorno()
            puntajef5.nombre_trastorno="Narcisista"
            puntajef5.puntaje_trastorno=X5
            puntajef5.registro=cuest
            puntajef5.save()
            puntajef6=PuntajeTrastorno()
            puntajef6.nombre_trastorno="Antisocial"
            puntajef6.puntaje_trastorno=X6a
            puntajef6.registro=cuest
            puntajef6.save()
            puntajef7=PuntajeTrastorno()
            puntajef7.nombre_trastorno="Compulsivo"
            puntajef7.puntaje_trastorno=X7
            puntajef7.registro=cuest
            puntajef7.save()
            puntajef8=PuntajeTrastorno()
            puntajef8.nombre_trastorno="Esquizotípico"
            puntajef8.puntaje_trastorno=DC2S
            puntajef8.registro=cuest
            puntajef8.save()
            puntajef9=PuntajeTrastorno()
            puntajef9.nombre_trastorno="Borderline"
            puntajef9.puntaje_trastorno=DC2C
            puntajef9.registro=cuest
            puntajef9.save()
            puntajef10=PuntajeTrastorno()
            puntajef10.nombre_trastorno="Paranoide"
            puntajef10.puntaje_trastorno=DC2P
            puntajef10.registro=cuest
            puntajef10.save()
    objs_proceso = PuntajeTrastorno.objects.all()
    return render(request,"procesos/listar_resultados.html",{"objs":objs_proceso,})

def listar_resultados(request):
    objs_list = PuntajeTrastorno.objects.all()
    return render(request,"procesos/listar_resultados.html",{"objs":objs_list,})

def resultados_2(request):
    objs_list = Cuestionario.objects.all()
    for cuest in objs_list:
        objs_proceso = PuntajeTrastorno.objects.filter(registro=cuest.id)
        mayorp=0
        mayorn=""
        indic=""
        for i in objs_proceso:
            if i.puntaje_trastorno>mayorp:
                mayorp=i.puntaje_trastorno
                mayorn=i.nombre_trastorno
        if mayorp>=85:
            indic="Elevado"
        if mayorp<=84 and mayorp>=75:
            indic="Moderado"
        if mayorp<=74 and mayorp>=60:
            indic="Sugestivo"
        if mayorp<=59 and mayorp>=35:
            indic="Bajo"
        if mayorp<=34 and mayorp>=0:
            indic="Nulo"
        actual_cuest = Cuestionario.objects.get(pk=cuest.id)
        actual_cuest.trastorno_final=mayorn
        actual_cuest.indicador=indic
        actual_cuest.save()
    objs_list = Cuestionario.objects.all()
    return render(request,"procesos/listar_resultados_finales.html",{"objs":objs_list,})

def listar_resultados_final(request):
    objs_list = Cuestionario.objects.all()
    return render(request,"procesos/listar_resultados_finales.html",{"objs":objs_list,})